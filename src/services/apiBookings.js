/* eslint-disable no-unused-vars */
import { getToday } from "../utils/helpers";
import supabase from "./supabase";
import { PAGE_SIZE } from "../utils/constants"
import { createGuest } from "./apiGuests"; // Update this path to the correct one


export async function getBookings({ filter, sortBy, page }) {
  let query = supabase
    .from('bookings')
    .select("id, created_at, startDate, endDate, numNights, numGuests, status, totalPrice, cabins(name), guests(fullName, email)", { count: "exact" });
  if (filter) {
    query = query[filter.method ? filter.method : "eq"](filter.field, filter.value)
  }
  switch (sortBy.field) {
    case 'excludePastBookings':
      query = query
        .gte('startDate', getToday())
        .order('startDate', { ascending: true });
      break;
    default:
      query = query.order(sortBy.field, { ascending: sortBy.direction === "asc" });
  }

  if (page) {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }
  return { data, count };
}

export async function getBooking(id) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, cabins(*), guests(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking not found");
  }

  return data;
}

// Returns all BOOKINGS that are were created after the given date. Useful to get bookings created in the last 30 days, for example.
export async function getBookingsAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("created_at, totalPrice, extrasPrice")
    .gte("created_at", date)
    .lte("created_at", getToday({ end: true }));

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Returns all STAYS that are were created after the given date
export async function getStaysAfterDate(date) {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  return data;
}

// Activity means that there is a check in or a check out today
export async function getStaysTodayActivity() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
      `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

  // Equivalent to this. But by querying this, we only download the data we actually need, otherwise we would need ALL bookings ever created
  // (stay.status === 'unconfirmed' && isToday(new Date(stay.startDate))) ||
  // (stay.status === 'checked-in' && isToday(new Date(stay.endDate)))

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }
  return data;
}

export async function updateBooking(id, updates) {
  const { extraExpenses, ...rest } = updates;

  const updateObject = {
    ...rest,
    ...(extraExpenses !== undefined && { extraExpenses: Number(extraExpenses) })
  };
  const { data, error } = await supabase
    .from("bookings")
    .update(updateObject)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Booking could not be updated");
  }
  return data;
}

export async function deleteBooking(id) {
  // REMEMBER RLS POLICIES
  const { data, error } = await supabase.from("bookings").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Booking could not be deleted");
  }
  return data;
}
export async function checkForOverlappingBookings(
  cabinId,
  startDate,
  endDate,
  editBookingId = null
) {
  let query = supabase
    .from("bookings")
    .select("id")
    .not("status", "eq", "checked-out")
    .eq("cabinId", cabinId)
    .lte("startDate", endDate)
    .gte("endDate", startDate);

  if (editBookingId) {
    query = query.not("id", "eq", editBookingId);
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Failed to check for overlapping bookings");
  }

  return data.length > 0;
}

export async function createBooking(newBooking) {
  const { cabinId, startDate, endDate } = newBooking;
  const hasOverlap = await checkForOverlappingBookings(
    cabinId,
    startDate,
    endDate
  );

  if (hasOverlap) {
    throw new Error("The cabin is already booked for the selected dates.");
  } else {
    const { data, error } = await supabase
      .from("bookings")
      .insert([{ ...newBooking }])
      .select();

    if (error) {
      console.error(error);
      throw new Error("Booking could not be created");
    }

    return data;
  }
}
export async function updateAllColumnsBooking(bookingId, newBookingData) {
  const { cabinId, startDate, endDate } = newBookingData;
  const hasOverlap = await checkForOverlappingBookings(
    cabinId,
    startDate,
    endDate,
    bookingId
  );

  if (hasOverlap) {
    throw new Error("The cabin is already booked for the selected dates.");
  } else {
    const { data, error } = await supabase
      .from("bookings")
      .update(newBookingData)
      .eq("id", bookingId)
      .select();

    if (error) {
      console.error(error);
      throw new Error("Booking could not be updated ");
    }
    return data;
  }
}

export async function getBookingsByCabin(cabinId) {
  const query = supabase
    .from("bookings")
    .select("*")
    .eq("cabinId", cabinId)
    .gte("endDate", getToday())
    .not("status", "eq", "checked-out");

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Bookings could not be loaded");
  }
  return data;
}
export async function getGuests() {
  const { data, error } = await supabase.from("guests").select("*");

  if (error) {
    console.log(error);
    throw new Error("Guests could not be retrieved.");
  }

  return data;
}
export async function createGuestApi(newGuest) {
  let query = supabase.from("guests").insert([{ ...newGuest }]);
  const { data, error } = await query.select().single();
  if (error) {
    console.log(error);
    throw new Error("Guest could not be created.");
  }
  return data;
}
{/*
export async function createEditBooking(newBooking, id) {
  // sample image URL: https://dsqtriwwhcghewiejevj.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  let query = supabase.from("bookings");

  // create
  if (!id) query = query.insert([{ ...newBooking }]);

  // edit
  if (id)
    query = query
      .update({ ...newBooking })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Booking could not be created.");
  }

  return data;
}

*/}
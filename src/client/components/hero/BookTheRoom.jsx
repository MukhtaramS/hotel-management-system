import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateBookings } from "../../../features/bookings/useCreateBookings";
import { useSettings } from "../../../features/settings/useSettings";
import { useAllCabins } from "../../../features/cabins/useAllCabins";
import { useAllGuests } from "../../../features/guests/useAllGuests";
import { useAvailability } from "../../../features/bookings/useAvailability";
import { useGetBookingsByCabin } from "../../../features/bookings/useGetBookingsByCabin";
import { useDarkMode } from "../../../context/DarkModeContext";
import { useMoveBack } from "../../../hooks/useMoveBack";
import { usePopover } from "../../../hooks/usePopover";
import { useDatePicker } from "../../../hooks/useDatePicker";
import { useWindowSize } from "../../../hooks/useWindowSize";
import { formatCurrency, subtractDates } from "../../../utils/helpers";
import { modifiersStylesDatePicker, windowSizes } from "../../../utils/constants";
import CreateGuestForm from "../../../features/guests/CreateGuestForm";
import MessageAvailable from "../../../features/bookings/MessageAvailable";
import { HiOutlineSquare3Stack3D, HiOutlineQuestionMarkCircle } from "react-icons/hi2";
import { ArrowContainer, Popover } from "react-tiny-popover";
import { DayPicker } from "react-day-picker";
import Input from "../../../ui/Input";
import Form from "../../../ui/Form";
import Button from "../../../ui/Button";
import Textarea from "../../../ui/Textarea";
import Row from "../../../ui/Row";
import FormRow from "../../../ui/FormRow";
import FormRowVertical from "../../../ui/FormRowVertical";
import Spinner from "../../../ui/Spinner";
import Select from "../../../ui/Select";
import Checkbox from "../../../ui/Checkbox";
import ButtonText from "../../../ui/ButtonText";
import Heading from "../../../ui/Heading";
import ButtonGroup from "../../../ui/ButtonGroup";
import PopoverContent from "../../../ui/PopoverContent";
import FooterDatePicker from "../../../ui/FooterDatePicker";
import Modal from "../../../ui/Modal";
import { isBefore, isValid, parseISO, format, eachDayOfInterval, startOfToday, endOfDay, subHours } from "date-fns";

export function BookTheRoom() {
    const [extraExpenses, setExtraExpenses] = useState([]);
    const [guestList, setGuestList] = useState([]);
    const [selectedGuest, setSelectedGuest] = useState("");

    const { roomId } = useParams();
    const { isDarkMode } = useDarkMode();
    const { createBooking, isLoading: isCreating } = useCreateBookings();
    const { settings, isLoading: isLoadingSettings } = useSettings();
    const { cabins, isLoading: isLoadingCabins } = useAllCabins();
    const { guests, isLoading: isLoadingGuests } = useAllGuests();
    const moveBack = useMoveBack();
    const navigate = useNavigate();
    const { cabinId: cabinIdUrl } = useParams();
    const { isPopoverOpen, openPopover, closePopover, boxContainerPopoverRef } = usePopover();
    const { width } = useWindowSize();

    const {
        register,
        handleSubmit,
        reset,
        watch,
        control,
        getValues,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            cabinId: cabinIdUrl || "",
            startDate: "",
            endDate: "",
            guestId: "",
            numGuests: 1,
            numNights: 0,
            cabinPrice: 0,
            discount: 0,
            observations: "",
            extrasPrice: 0,
            totalPrice: 0,
            hasBreakfast: false,
            isPaid: false,
        },
    });

    useEffect(() => {
        reset({
            cabinId: cabinIdUrl || "",
            numGuests: 1,
            startDate: "",
            endDate: "",
            hasBreakfast: false,
            isPaid: false,
        });
    }, [cabinIdUrl, reset]);

    useEffect(() => {
        if (guests) {
            setGuestList(guests);
        }
    }, [guests]);

    const handleNewGuestCreated = (newGuest) => {
        setGuestList((prevGuests) => [...prevGuests, newGuest]);
        setValue("guestId", newGuest.id);
        setSelectedGuest(newGuest.id);
    };

    const cabinIdInput = watch("cabinId");
    const startDateInput = watch("startDate");
    const endDateInput = watch("endDate");

    const { availability } = useAvailability(cabinIdInput, startDateInput, endDateInput);
    const { isAvailable } = availability;

    const { range, setRange, handleDayClick, handleResetRange } = useDatePicker();

    const { bookedDates, isLoadingBookedDates } = useGetBookingsByCabin(Number(cabinIdInput));

    if (isLoadingSettings || isLoadingCabins || isLoadingGuests || isLoadingBookedDates) {
        return <Spinner />;
    }

    const numNightsInput = startDateInput && endDateInput && endDateInput > startDateInput
        ? subtractDates(endDateInput, startDateInput)
        : 0;

    const filteredCabins = (() => {
        switch (roomId) {
            case "1":
                return cabins.filter(cabin => cabin.name.includes("Deluxe Double Room"));
            case "2":
                return cabins.filter(cabin => cabin.name.includes("Twin Room"));
            case "3":
                return cabins.filter(cabin => cabin.name.includes("Classic Double Room"));
            case "4":
                return cabins.filter(cabin => cabin.name.includes("Mountain View Suite"));
            default:
                return cabins;
        }
    })();

    const cabinOptions = [
        { value: "", label: "Select a Cabin" },
        ...filteredCabins
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((cabin) => ({
                value: cabin.id,
                label: `${cabin.name}  (${cabin.maxCapacity} guests)`,
            })),
    ];

    const oneHourAgo = subHours(new Date(), 1);
    const guestOptions = [
        { value: "", label: "Select a Guest" },
        ...guestList
            .filter(guest => new Date(guest.created_at) >= oneHourAgo)
            .sort((a, b) => a.fullName.localeCompare(b.fullName))
            .map((guest) => ({
                value: guest.id,
                label: guest.fullName,
            })),
    ];

    const numGuestInput = watch("numGuests");
    const hasBreakfast = watch("hasBreakfast");
    const isPaid = watch("isPaid");

    const cabinInput = cabins.find(
        (cabinInput) => cabinInput.id === Number(cabinIdInput)
    );

    const numGuestOptions = [
        { value: "", label: "Select a number" },
        ...Array.from({ length: cabinInput?.maxCapacity }, (_, i) => ({
            value: i + 1,
            label: `${i + 1} guest${i > 0 ? "s" : ""}`,
        })),
    ];

    const cabinPriceInput = cabinInput
        ? cabinInput.regularPrice * numNightsInput
        : 0;

    const extraPriceInput = hasBreakfast
        ? numNightsInput * settings.breakfastPrice * Number(numGuestInput)
        : 0;

    const discountInput = cabinInput ? cabinInput.discount : 0;

    const totalPriceInput =
        numNightsInput > 0 ? cabinPriceInput + extraPriceInput - discountInput + Number(extraExpenses) : 0;

    const bookedDatesForCabin = bookedDates?.flatMap(({ startDate, endDate }) => {
        const start = parseISO(startDate);
        const end = endOfDay(parseISO(endDate));

        const startToday = isBefore(start, startOfToday()) ? startOfToday() : start;

        const datesInRange = eachDayOfInterval({ start: startToday, end });
        return datesInRange;
    });

    const bookingValidation = {
        cabinId: {
            required: "Cabin is required",
        },

        startDate: {
            required: "Check in date is required",
            validate: {
                isValidDate: (value) => isValid(parseISO(value)) || "Invalid date",
                isFutureDate: (value) =>
                    isBefore(value, startOfToday())
                        ? "Check in cannot be before today"
                        : true,
            },
        },

        endDate: {
            required: "Check out date is required",
            validate: {
                isValidDate: (value) => isValid(parseISO(value)) || "Invalid date",

                isAfterStartDate: (value) => {
                    return (
                        !isBefore(parseISO(value), parseISO(getValues("startDate"))) ||
                        "Check out cannot be before check in"
                    );
                },

                isSameDate: (value) => {
                    return (
                        parseISO(value).getTime() !==
                        parseISO(getValues("startDate")).getTime() ||
                        "Check out cannot be the same date as check in"
                    );
                },
                isMinBookingLength: (value) => {
                    return subtractDates(value, getValues("startDate")) >=
                        settings?.minBookingLength
                        ? true
                        : `Minimum number of nights per booking is ${settings?.minBookingLength}`;
                },

                ismaxBookingLength: (value) => {
                    return subtractDates(value, getValues("startDate")) <=
                        settings?.maxBookingLength
                        ? true
                        : `Maximum number of nights per booking is ${settings?.maxBookingLength}`;
                },
            },
        },

        guestId: { required: "The booking must have a guest" },

        numGuests: {
            required: "Number of guests is required",
            min: {
                value: 1,
                message: "Minimum number of guests must be 1",
            },
            max: {
                value: cabinInput?.maxCapacity,
                message: `Maximum number of guests must be ${cabinInput?.maxCapacity}`,
            },
        },
    };

    function handleReset() {
        reset();
        navigate("/reservation/new");
        handleResetRange();
    }

    function onSubmit(data) {
        const cabinIdNum = Number(data.cabinId);
        const reservedCabin = cabins.find((cabin) => cabin.id === cabinIdNum);

        const cabinPrice =
            (reservedCabin.regularPrice - reservedCabin.discount) * numNightsInput;

        const extrasPrice =
            numNightsInput * settings.breakfastPrice * Number(numGuestInput);

        const totalPrice = cabinPrice + extrasPrice;

        const finalData = {
            ...data,
            startDate: new Date(data.startDate).toISOString(),
            endDate: new Date(data.endDate).toISOString(),
            numNights: numNightsInput,
            numGuests: Number(data.numGuests),
            cabinId: Number(data.cabinId),
            guestId: Number(data.guestId),
            observations: data.observations,
            extraExpenses: Number(extraExpenses),
            hasBreakfast,
            isPaid,
            cabinPrice,
            extrasPrice,
            totalPrice,
            status: "unconfirmed",
        };

        createBooking(finalData, {
            onSuccess: () => {
                handleReset();
                navigate('/');
            },
        });
    }

    function onError(errors) {
        console.log(errors);
    }

    return (
        <>
            <MessageAvailable
                cabinIdInput={cabinIdInput}
                startDateInput={startDateInput}
                endDateInput={endDateInput}
            />

            {width >= windowSizes.tablet ? (
                <Form type="regular" onSubmit={handleSubmit(onSubmit, onError)}>
                    <FormRow label="Cabin" error={errors?.cabinId?.message}>
                        <Controller
                            name="cabinId"
                            control={control}
                            rules={bookingValidation.cabinId}
                            render={({ field: { ref, value, onChange } }) => (
                                <Select
                                    ref={ref}
                                    options={cabinOptions}
                                    value={value}
                                    onChange={(e) => onChange(e.target.value)}
                                    disabled={isCreating}
                                />
                            )}
                        />
                    </FormRow>

                    <FormRow flex="datepicker" label="Check in - Check out dates">
                        <Controller
                            name="startDate"
                            id="startDate"
                            rules={bookingValidation.startDate}
                            control={control}
                            render={({ field: { ref, value, onChange } }) => (
                                <input
                                    type="hidden"
                                    ref={ref}
                                    onChange={(e) => onChange(e.target.value)}
                                    value={value || ""}
                                />
                            )}
                        />
                        <Controller
                            name="endDate"
                            id="endDate"
                            rules={bookingValidation.endDate}
                            control={control}
                            render={({ field: { ref, value, onChange } }) => (
                                <input
                                    type="hidden"
                                    ref={ref}
                                    onChange={(e) => onChange(e.target.value)}
                                    value={value || ""}
                                />
                            )}
                        />

                        <DayPicker
                            mode="range"
                            modifiers={{ booked: bookedDatesForCabin }}
                            modifiersStyles={modifiersStylesDatePicker.create}
                            onDayClick={handleDayClick}
                            selected={range}
                            onSelect={(range) => {
                                setRange(range);
                                setValue(
                                    "startDate",
                                    range?.from ? format(range?.from, "yyyy-MM-dd") : ""
                                );
                                setValue(
                                    "endDate",
                                    range?.to ? format(range?.to, "yyyy-MM-dd") : ""
                                );
                            }}
                            footer={<FooterDatePicker range={range} />}
                        />
                    </FormRow>

                    <FormRow error={errors?.endDate?.message}>
                        <input hidden name="endDate" id="endDate" />
                    </FormRow>

                    {isAvailable === false && (
                        <FormRowVertical>
                            {!!(cabinIdInput || startDateInput || endDateInput) && (
                                <span style={{ placeSelf: "center" }}>
                                    <Button
                                        type="reset"
                                        variation="secondary"
                                        onClick={handleReset}
                                    >
                                        Reset
                                    </Button>
                                </span>
                            )}
                        </FormRowVertical>
                    )}

                    {isAvailable === true && (
                        <>
                            <FormRow label="Number of Nights">
                                <Input disabled value={numNightsInput} />
                            </FormRow>

                            <Modal>
                                <Modal.Open opens="guest-form">
                                    <Button>+ New Guest</Button>
                                </Modal.Open>
                                <Modal.Window name="guest-form">
                                    <CreateGuestForm onGuestCreated={handleNewGuestCreated} onCloseModal={closePopover} />
                                </Modal.Window>
                            </Modal>

                            <FormRow label="Guest Name" error={errors?.guestId?.message}>
                                <Controller
                                    name="guestId"
                                    control={control}
                                    rules={bookingValidation.guestId}
                                    render={({ field: { ref, value, onChange } }) => (
                                        <Select
                                            ref={ref}
                                            options={guestOptions}
                                            value={selectedGuest} // Use selectedGuest as the value
                                            onChange={(e) => {
                                                setSelectedGuest(e.target.value);
                                                onChange(e.target.value);
                                            }}
                                            disabled={isCreating}
                                        />
                                    )}
                                />
                            </FormRow>

                            <FormRow
                                label="Number of Guests"
                                error={errors?.numGuests?.message}
                            >
                                <Controller
                                    name="numGuests"
                                    control={control}
                                    rules={bookingValidation.numGuests}
                                    render={({ field: { ref, value, onChange } }) => (
                                        <Select
                                            ref={ref}
                                            options={numGuestOptions}
                                            value={value}
                                            onChange={(e) => onChange(e.target.value)}
                                            disabled={isCreating}
                                        />
                                    )}
                                />
                            </FormRow>

                            <FormRow label="Price">
                                <Input disabled value={formatCurrency(cabinPriceInput)} />
                            </FormRow>

                            <FormRow label="Discount">
                                <Input disabled value={formatCurrency(discountInput)} />
                            </FormRow>

                            <FormRow label="Observations">
                                <Textarea
                                    disabled={isCreating}
                                    id="observations"
                                    {...register("observations")}
                                />
                            </FormRow>

                            <FormRow label="Extra Price">
                                <Input disabled value={formatCurrency(extraPriceInput)} />
                            </FormRow>
                            <FormRow label="Extra Expenses" error={errors?.extraExpenses?.message}>
                                <Input
                                    type="number"
                                    id="extraExpenses"
                                    {...register("extraExpenses", {
                                        min: {
                                            value: 0,
                                            message: 'Extra expenses should not be negative'
                                        }
                                    })}
                                    value={extraExpenses}
                                    onChange={(e) => setExtraExpenses(e.target.value)}
                                />
                            </FormRow>

                            <FormRow label="Total Price">
                                <Input disabled value={formatCurrency(totalPriceInput)} />
                            </FormRow>

                            <FormRow>
                                <Controller
                                    control={control}
                                    name="hasBreakfast"
                                    render={({ field: { onChange, value } }) => (
                                        <Checkbox
                                            id="hasBreakfast"
                                            disabled={isCreating}
                                            checked={value}
                                            onChange={(e) => onChange(e.target.checked)}
                                        >
                                            Includes breakfast?
                                        </Checkbox>
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name="isPaid"
                                    render={({ field: { onChange, value } }) => (
                                        <Checkbox
                                            id="isPaid"
                                            disabled={isCreating}
                                            checked={value}
                                            onChange={(e) => onChange(e.target.checked)}
                                        >
                                            Was paid?
                                        </Checkbox>
                                    )}
                                />
                            </FormRow>

                            <FormRow>
                                <ButtonGroup>
                                    <Button
                                        variation="secondary"
                                        type="reset"
                                        onClick={handleReset}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        disabled={isCreating}
                                        type="submit"
                                        variation="primary"
                                    >
                                        Create Booking
                                    </Button>
                                </ButtonGroup>
                            </FormRow>
                        </>
                    )}
                </Form>
            ) : (
                // MOBILE
                <Form type="regular" onSubmit={handleSubmit(onSubmit, onError)}>
                    <FormRowVertical label="Cabin" error={errors?.cabinId?.message}>
                        <Controller
                            name="cabinId"
                            control={control}
                            rules={bookingValidation.cabinId}
                            render={({ field: { ref, value, onChange } }) => (
                                <Select
                                    ref={ref}
                                    options={cabinOptions}
                                    value={value}
                                    onChange={(e) => onChange(e.target.value)}
                                    disabled={isCreating}
                                />
                            )}
                        />
                    </FormRowVertical>

                    <FormRowVertical label="Check in - Check out dates">
                        <Controller
                            name="startDate"
                            id="startDate"
                            rules={bookingValidation.startDate}
                            control={control}
                            render={({ field: { ref, value, onChange } }) => (
                                <input
                                    type="hidden"
                                    ref={ref}
                                    onChange={(e) => onChange(e.target.value)}
                                    value={value || ""}
                                />
                            )}
                        />
                        <Controller
                            name="endDate"
                            id="endDate"
                            rules={bookingValidation.endDate}
                            control={control}
                            render={({ field: { ref, value, onChange } }) => (
                                <input
                                    type="hidden"
                                    ref={ref}
                                    onChange={(e) => onChange(e.target.value)}
                                    value={value || ""}
                                />
                            )}
                        />

                        <DayPicker
                            mode="range"
                            modifiers={{ booked: bookedDatesForCabin }}
                            modifiersStyles={modifiersStylesDatePicker.create}
                            onDayClick={handleDayClick}
                            selected={range}
                            onSelect={(range) => {
                                setRange(range);
                                setValue(
                                    "startDate",
                                    range?.from ? format(range?.from, "yyyy-MM-dd") : ""
                                );
                                setValue(
                                    "endDate",
                                    range?.to ? format(range?.to, "yyyy-MM-dd") : ""
                                );
                            }}
                            footer={<FooterDatePicker range={range} />}
                        />
                    </FormRowVertical>

                    <FormRowVertical error={errors?.endDate?.message}>
                        <input hidden name="endDate" id="endDate" />
                    </FormRowVertical>

                    {isAvailable === false && (
                        <FormRowVertical>
                            {!!(cabinIdInput || startDateInput || endDateInput) && (
                                <span style={{ placeSelf: "center" }}>
                                    <Button
                                        type="reset"
                                        variation="secondary"
                                        onClick={handleReset}
                                    >
                                        Reset
                                    </Button>
                                </span>
                            )}
                        </FormRowVertical>
                    )}

                    {isAvailable === true && (
                        <>
                            <FormRowVertical label="Number of Nights">
                                <Input disabled value={numNightsInput} />
                            </FormRowVertical>

                            <FormRowVertical
                                label="Guest Name"
                                error={errors?.guestId?.message}
                            >
                                <Controller
                                    name="guestId"
                                    control={control}
                                    rules={bookingValidation.guestId}
                                    render={({ field: { ref, value, onChange } }) => (
                                        <Select
                                            ref={ref}
                                            options={guestOptions}
                                            value={selectedGuest} // Use selectedGuest as the value
                                            onChange={(e) => {
                                                setSelectedGuest(e.target.value);
                                                onChange(e.target.value);
                                            }}
                                            disabled={isCreating}
                                        />
                                    )}
                                />
                            </FormRowVertical>

                            <FormRowVertical
                                label="Number of Guests"
                                error={errors?.numGuests?.message}
                            >
                                <Controller
                                    name="numGuests"
                                    control={control}
                                    rules={bookingValidation.numGuests}
                                    render={({ field: { ref, value, onChange } }) => (
                                        <Select
                                            ref={ref}
                                            options={numGuestOptions}
                                            value={value}
                                            onChange={(e) => onChange(e.target.value)}
                                            disabled={isCreating}
                                        />
                                    )}
                                />
                            </FormRowVertical>

                            <FormRowVertical label="Price">
                                <Input disabled value={formatCurrency(cabinPriceInput)} />
                            </FormRowVertical>

                            <FormRowVertical label="Discount">
                                <Input disabled value={formatCurrency(discountInput)} />
                            </FormRowVertical>

                            <FormRowVertical label="Observations">
                                <Textarea
                                    disabled={isCreating}
                                    id="observations"
                                    {...register("observations")}
                                />
                            </FormRowVertical>

                            <FormRowVertical label="Extra Price">
                                <Input disabled value={formatCurrency(extraPriceInput)} />
                            </FormRowVertical>

                            <FormRowVertical label="Total Price">
                                <Input disabled value={formatCurrency(totalPriceInput)} />
                            </FormRowVertical>

                            <FormRowVertical>
                                <Controller
                                    control={control}
                                    name="hasBreakfast"
                                    render={({ field: { onChange, value } }) => (
                                        <Checkbox
                                            id="hasBreakfast"
                                            disabled={isCreating}
                                            checked={value}
                                            onChange={(e) => onChange(e.target.checked)}
                                        >
                                            Includes breakfast?
                                        </Checkbox>
                                    )}
                                />

                                <Controller
                                    control={control}
                                    name="isPaid"
                                    render={({ field: { onChange, value } }) => (
                                        <Checkbox
                                            id="isPaid"
                                            disabled={isCreating}
                                            checked={value}
                                            onChange={(e) => onChange(e.target.checked)}
                                        >
                                            Was paid?
                                        </Checkbox>
                                    )}
                                />
                            </FormRowVertical>

                            <FormRowVertical>
                                <ButtonGroup>
                                    <Button
                                        variation="secondary"
                                        type="reset"
                                        onClick={handleReset}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        disabled={isCreating}
                                        type="submit"
                                        variation="primary"
                                    >
                                        Create Booking
                                    </Button>
                                </ButtonGroup>
                            </FormRowVertical>
                        </>
                    )}
                </Form>
            )}
        </>
    );
}

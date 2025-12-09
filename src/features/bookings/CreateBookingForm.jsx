{/*
import { useState } from "react";
import { differenceInDays, parseISO } from "date-fns";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Select from "react-select";
import { useCabins } from "../cabins/useCabins.js";
import { useCreateBooking } from "./UseCreateBooking.js";
import { useGuests } from "../guests/useGuests.js";

import Input from "../../ui/input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import CreateGuestForm from "../guests/CreateGuestForm";

function CreateBookingForm({ onCloseModal }) {
    const [isGuestFound, setIsGuestFound] = useState(false);
    const [showCreateGuestForm, setShowCreateGuestForm] = useState(false);
    const [guest, setGuest] = useState(null);

    const { cabins, isLoading } = useCabins();

    const { guests, isLoading: guestsLoading } = useGuests();

    const { isCreating, createBooking } = useCreateBooking();

    const { register, handleSubmit, reset, getValues, formState, control } =
        useForm({
            defaultValues: {},
            mode: "onChange",
        });

    const { fields, append, prepend, remove, swap, move, insert } =
        useFieldArray({
            control,
            name: "guestsArray",
        });

    const { errors } = formState;

    const cabinOptions = cabins?.map((cabin) => {
        return {
            value: cabin.id,
            label: cabin.name + " - " + "max capacity: " + cabin.maxCapacity,
        };
    });


    function onSubmit(data) {
        const newBooking = (({
            startDate,
            endDate,
            numNights,
            numGuests,
            cabinPrice,
            extrasPrice,
            totalPrice,
            status,
            hasBreakfast,
            isPaid,
            observations,
            cabinId,
            guestId,
        }) => ({
            startDate,
            endDate,
            numNights: duration(data.startDate, data.endDate),
            numGuests: data.guestsArray.length + 1,
            cabinPrice: cabins.find((cabin) => cabin.id === data.cabinId.value)
                .regPrice,
            extrasPrice: Number(data.extrasPrice),
            totalPrice:
                cabins.find((cabin) => cabin.id === data.cabinId.value).regPrice +
                Number(data.extrasPrice),
            status,
            hasBreakfast,
            isPaid,
            observations,
            cabinId: data.cabinId.value,
            guestId: guests.find(
                (guest) =>
                    guest.fullName.toUpperCase() === data.fullName.toUpperCase()
            )?.id,
        }))(data);

        createBooking(newBooking, {
            onSuccess: (newBooking) => {
                reset();
                onCloseModal?.();
            },
        });
    }

    function onSubmitGuest(data) {
        setIsGuestFound(
            guests.some(
                (guest) =>
                    guest.fullName.toUpperCase() === data.fullName.toUpperCase()
            )
        );
        if (isGuestFound)
            setGuest(
                guests.find(
                    (guest) =>
                        guest.fullName.toUpperCase() === data.fullName.toUpperCase()
                )
            );
        else {
            setShowCreateGuestForm(true);
            setGuest({ fullName: data.fullName });
        }
    }

    function onError(errors) {
        console.log(errors);
    }

    function duration(startDate, endDate) {
        return differenceInDays(parseISO(endDate), parseISO(startDate));
    }

    return (
        <>
            {!showCreateGuestForm && (
                <Form
                    type={onCloseModal ? "modal" : "regular"}
                    onSubmit={handleSubmit(onSubmitGuest, onError)}
                >
                    <FormRow
                        label="Guest full name"
                        error={errors?.startDate?.message}
                    >
                        <Input
                            type="text"
                            id="fullName"
                            disabled={isCreating}
                            {...register("fullName")}
                        />
                    </FormRow>
                    <FormRow>
                        <Button
                            $variation="secondary"
                            type="reset"
                            onClick={() => onCloseModal?.()}
                        >
                            Cancel
                        </Button>
                        <Button
                        >
                            Lookup guest
                        </Button>
                    </FormRow>
                </Form>
            )}
            {showCreateGuestForm && !isGuestFound && (
                <CreateGuestForm
                    guest={guest}
                    handleGuest={setGuest}
                    onCloseModal={onCloseModal}
                    handleIsGuestFound={setIsGuestFound}
                />
            )}
            {isGuestFound && (
                <Form
                    onSubmit={handleSubmit(onSubmit, onError)}
                    type={onCloseModal ? "modal" : "regular"}
                >

                    <FormRow label="Full name" error={errors?.fullName?.message}>
                        <Input
                            type="text"
                            id="fullName"
                            defaultValue={guest?.fullName}
                            {...register("fullName", {
                                required: "This field is required",
                            })}
                        />
                    </FormRow>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "26.5rem 1fr 1fr",
                            paddingTop: "1.2rem",
                            paddingBottom: "1.2rem",
                        }}
                    >
                        <label
                            htmlFor="guestsArray"
                        >
                            Additional guests
                        </label>
                        <ul
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "0.5rem",
                            }}
                        >
                            {fields.map((field, index) => {
                                return (
                                    <li
                                        style={{
                                            display: "flex",
                                            gap: "0.5rem",
                                        }}
                                        key={field.id}
                                    >
                                        <Input
                                            type="text"
                                            id="guestsArray"
                                            disabled={isCreating}
                                            {...register(`guestsArray.${index}.fullName`)}
                                        />
                                        {index > -1 && (
                                            <Button
                                                $variation="secondary"
                                                size="small"
                                                onClick={() => remove(index)}
                                            >
                                                Remove
                                            </Button>
                                        )}
                                    </li>
                                );
                            })}

                            <span>
                                <Button
                                    $variation="secondary"
                                    size="small"
                                    onClick={() => append({ fullName: "" })}
                                >
                                    Add guest full name
                                </Button>
                            </span>
                        </ul>
                    </div>
                    <FormRow label="Start date" error={errors?.startDate?.message}>
                        <Input
                            type="date"
                            id="startDate"
                            disabled={isCreating}
                            {...register("startDate", {
                                required: "This field is required.",
                            })}
                        />
                    </FormRow>
                    <FormRow label="End date" error={errors?.endDate?.message}>
                        <Input
                            type="date"
                            id="endDate"
                            disabled={isCreating}
                            {...register("endDate", {
                                required: "This field is required.",
                            })}
                        />
                    </FormRow>

                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "26.5rem 1fr 1fr",
                            paddingTop: "1.2rem",
                            paddingBottom: "1.2rem",
                        }}
                    >
                        <label htmlFor="cabinId">Select cabin</label>
                        <Controller
                            name="cabinId"
                            control={control}
                            render={({ field: { onChange, value, ref } }) => (
                                <span style={{ color: "black" }}>
                                    <Select
                                        options={cabinOptions}
                                        onChange={onChange}
                                        value={value}
                                        inputRef={ref}
                                        id="cabinId"
                                        error={!!errors.cabinId}
                                    />
                                </span>
                            )}
                            rules={{ required: true }}
                        />
                        {errors.cabinId && (
                            <p style={{ color: "red", paddingLeft: "1rem" }}>
                                This field is required.
                            </p>
                        )}
                    </div>

                    <FormRow
                        label="Extras price"
                        error={errors?.extrasPrice?.message}
                    >
                        <Input
                            type="number"
                            id="extrasPrice"
                            disabled={isCreating}
                            {...register("extrasPrice")}
                        />
                    </FormRow>

                    <FormRow label="Status" error={errors?.status?.message}>
                        <Input
                            type="text"
                            id="status"
                            disabled={isCreating}
                            defaultValue="unconfirmed"
                            {...register("status")}
                        />
                    </FormRow>

                    <FormRow
                        label="Include breakfast?"
                        error={errors?.hasBreakfast?.message}
                    >
                        <input
                            type="checkbox"
                            id="hasBreakfast"
                            disabled={isCreating}
                            {...register("hasBreakfast")}
                        />
                    </FormRow>

                    <FormRow label="Paid?" error={errors?.isPaid?.message}>
                        <input
                            type="checkbox"
                            id="isPaid"
                            disabled={isCreating}
                            {...register("isPaid")}
                        />
                    </FormRow>

                    <FormRow
                        label="Observations"
                        error={errors?.observations?.message}
                    >
                        <Textarea
                            type="text"
                            id="observations"
                            disabled={isCreating}
                            {...register("observations")}
                        />
                    </FormRow>

                    <FormRow>
                        <Button
                            $variation="secondary"
                            type="reset"
                            onClick={() => onCloseModal?.()}
                        >
                            Cancel
                        </Button>
                        <Button disabled={isCreating}>
                            Add booking
                        </Button>
                    </FormRow>
                </Form>
            )}{" "}
        </>
    );
}

export default CreateBookingForm;
*/}
{/*
import { useEffect } from "react";
import React, { useState, useContext } from 'react';
import { useFieldArray } from "react-hook-form";


import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import { useGuests } from "../guests/useGuests.js";

import { useCreateBookings } from "./useCreateBookings";
import { useSettings } from "../settings/useSettings";
import { useAllCabins } from "../cabins/useAllCabins";
//import { useAllGuests } from "../guests/useAllGuests";
import { useAvailability } from "./useAvailability";
import { useGetBookingsByCabin } from "./useGetBookingsByCabin";

import Form from "../../ui/Form";
import Input from "../../ui/input.jsx";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import Row from "../../ui/Row";
import FormRow from "../../ui/FormRow";
import FormRowVertical from "../../ui/FormRowVertical";
import Spinner from "../../ui/Spinner";
import Select from "../../ui/Select";
import Checkbox from "../../ui/Checkbox";
import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import PopoverContent from "../../ui/PopoverContent";
import FooterDatePicker from "../../ui/FooterDatePicker";

import {
    isBefore,
    isValid,
    parseISO,
    format,
    eachDayOfInterval,
    startOfToday,
    endOfDay,
} from "date-fns";

import {
    HiOutlineSquare3Stack3D,
    HiOutlineQuestionMarkCircle,
} from "react-icons/hi2";

import { ArrowContainer, Popover } from "react-tiny-popover";
import { DayPicker } from "react-day-picker";
import { useMoveBack } from "../../hooks/useMoveBack";
import { formatCurrency, subtractDates } from "../../utils/helpers";
import { usePopover } from "../../hooks/usePopover";
import { useDatePicker } from "../../hooks/useDatePicker";
import { useWindowSize } from "../../hooks/useWindowSize";
import { modifiersStylesDatePicker, windowSizes } from "../../utils/constants";

function CreateBookingForm() {
    const { createBooking, isLoading: isCreating } = useCreateBookings();

    const { settings, isLoading: isLoadingSettings } = useSettings();

    const { cabins, isLoading: isLoadingCabins } = useAllCabins();
    const [showCreateGuestForm, setShowCreateGuestForm] = useState(false);
    const [guest, setGuest] = useState(null);
    const { createGuest, isLoading: isCreatingGuest } = useCreateGuest(); // For creating guests


    //    const { guests, isLoading: isLoadingGuests } = useAllGuests();

    const moveBack = useMoveBack();

    const navigate = useNavigate();

    const { cabinId: cabinIdUrl } = useParams();

    const { isPopoverOpen, openPopover, closePopover, boxContainerPopoverRef } =
        usePopover();

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
            extraPrice: 0,
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

    const cabinIdInput = watch("cabinId");
    const startDateInput = watch("startDate");
    const endDateInput = watch("endDate");

    const { availability } = useAvailability(
        cabinIdInput,
        startDateInput,
        endDateInput
    );

    const { isAvailable } = availability;

    const { range, setRange, handleDayClick, handleResetRange } = useDatePicker();

    const { bookedDates, isLoadingBookedDates } = useGetBookingsByCabin(
        Number(cabinIdInput)
    );

    if (
        isLoadingSettings ||
        isLoadingCabins ||
        //        isLoadingGuests ||
        isLoadingBookedDates
    )
        return <Spinner />;

    const numNightsInput =
        startDateInput && endDateInput && endDateInput > startDateInput
            ? subtractDates(endDateInput, startDateInput)
            : 0;

    const cabinOptions = [
        { value: "", label: "Select a Cabin" },
        ...cabins
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((cabin) => ({
                value: cabin.id,
                label: `${cabin.name}  (${cabin.maxCapacity} )`,
            })),
    ];

    {/*const guestOptions = [
        { value: "", label: "Select a Guest" },
        ...guests
            .sort((a, b) => a.fullName.localeCompare(b.fullName))
            .map((guest) => ({
                value: guest.id,
                label: guest.fullName,
            })),
    ];*/}
{/*
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
        numNightsInput > 0 ? cabinPriceInput + extraPriceInput - discountInput : 0;

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
                        ? "Check in cannot before today"
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
        navigate("/bookings/new");
        handleResetRange();
    }

    function onSubmit(data) {
        setShowCreateGuestForm(true);
        setGuest({ fullName: data.fullName });
        // selected Cabin
        const cabinIdNum = Number(data.cabinId);
        const reservedCabin = cabins.find((cabin) => cabin.id === cabinIdNum);

        const cabinPrice =
            (reservedCabin.regularPrice - reservedCabin.discount) * numNightsInput;

        const extraPrice =
            numNightsInput * settings.breakfastPrice * Number(numGuestInput);

        const totalPrice = cabinPrice + extraPrice;

        const finalData = {
            ...data,
            startDate: new Date(data.startDate).toISOString(),
            endDate: new Date(data.endDate).toISOString(),
            numNights: numNightsInput,
            numGuests: Number(data.numGuests),
            cabinId: Number(data.cabinId),
            guestId: Number(data.guestId),
            observations: data.observations,
            hasBreakfast,
            isPaid,
            cabinPrice,
            extraPrice,
            totalPrice,
            status: "unconfirmed",
        };

        createBooking(finalData, {
            onSuccess: () => {
                handleReset();
            },
        });
    }
    function onSubmitNewGuest(data) {
        createGuest(data, {
            onSuccess: (newGuest) => {
                setGuest(newGuest); // Update guest state with created guest
                setShowCreateGuestForm(false); // Hide the new guest form
            },
        });
    }
    function onError(errors) {
        console.log(errors);
    }

    return (
        <>
            <div>
                <ButtonText className="button-back" onClick={moveBack}>
                    &larr; Back
                </ButtonText>
            </div>

            <Row type="form">
                <Heading as="h1">
                    <span>
                        <HiOutlineSquare3Stack3D />
                    </span>
                    {cabinIdInput ? `Book Cabin ${cabinInput?.name}` : "Book Cabin"}
                    <span>
                        <Popover
                            isOpen={isPopoverOpen}
                            positions={
                                width >= windowSizes.tablet
                                    ? ["right", "bottom"]
                                    : ["bottom", "right"]
                            }
                            padding={10}
                            reposition={false}
                            onClickOutside={closePopover}
                            parentElement={boxContainerPopoverRef.current}
                            content={({ position, childRect, popoverRect }) => (
                                <ArrowContainer
                                    position={position}
                                    childRect={childRect}
                                    popoverRect={popoverRect}
                                    arrowColor={"var(--color-grey-400)"}
                                    arrowSize={8}
                                >
                                    <PopoverContent>
                                        &#10095; First, check if the cabin is available for the
                                        selected dates. Then fill out the rest of the form to
                                        complete your booking.
                                    </PopoverContent>
                                </ArrowContainer>
                            )}
                        >
                            <ButtonText
                                type="form"
                                onClick={openPopover}
                                onMouseEnter={openPopover}
                                onMouseLeave={closePopover}
                                whileHover={{ scale: 1.8 }}
                                whileTap={
                                    width >= windowSizes.tablet ? { scale: 1 } : { scale: 2 }
                                }
                                transition={{ duration: 0.3, type: "spring", stiffness: 500 }}
                            >
                                <HiOutlineQuestionMarkCircle />
                            </ButtonText>
                        </Popover>
                    </span>
                </Heading>
            </Row>



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

                            <FormRow label="Guest Name" error={errors?.guestId?.message}>
                                <Controller
                                    name="guestId"
                                    control={control}
                                    rules={bookingValidation.guestId}
                                    render={({ field: { ref, value, onChange } }) => (
                                        <Input
                                            ref={ref}
                                            //                                            options={guestOptions}
                                            value={value}
                                            onChange={(e) => onChange(e.target.value)}
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
                                        <Input
                                            ref={ref}
                                            //                                           options={guestOptions}
                                            value={value}
                                            onChange={(e) => onChange(e.target.value)}
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

export default CreateBookingForm;
*/}
import { useEffect } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";

import { useCreateBookings } from "./useCreateBookings";
import { useSettings } from "../settings/useSettings";
import { useAllCabins } from "../cabins/useAllCabins";
import { useAllGuests } from "../guests/useAllGuests";
import { useAvailability } from "./useAvailability";
import { useGetBookingsByCabin } from "./useGetBookingsByCabin";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import Row from "../../ui/Row";
import FormRow from "../../ui/FormRow";
import FormRowVertical from "../../ui/FormRowVertical";
import Spinner from "../../ui/Spinner";
import Select from "../../ui/Select";
import Checkbox from "../../ui/Checkbox";
import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import PopoverContent from "../../ui/PopoverContent";
import FooterDatePicker from "../../ui/FooterDatePicker";
import MessageAvailable from "./MessageAvailable";
import { useDarkMode } from "../../context/DarkModeContext";

import {
    isBefore,
    isValid,
    parseISO,
    format,
    eachDayOfInterval,
    startOfToday,
    endOfDay,
} from "date-fns";

import {
    HiOutlineSquare3Stack3D,
    HiOutlineQuestionMarkCircle,
} from "react-icons/hi2";

import { ArrowContainer, Popover } from "react-tiny-popover";

import { DayPicker } from "react-day-picker";


import { useMoveBack } from "../../hooks/useMoveBack";
import { formatCurrency, subtractDates } from "../../utils/helpers";
import { usePopover } from "../../hooks/usePopover";
import { useDatePicker } from "../../hooks/useDatePicker";
import { useWindowSize } from "../../hooks/useWindowSize";
import { modifiersStylesDatePicker, windowSizes } from "../../utils/constants";
import { useState } from "react"
import MainHeading from "../../ui/MainHeading";

function CreateBookingForm() {
    const [extraExpenses, setExtraExpenses] = useState([]);

    const { isDarkMode } = useDarkMode();

    const { createBooking, isLoading: isCreating } = useCreateBookings();

    const { settings, isLoading: isLoadingSettings } = useSettings();

    const { cabins, isLoading: isLoadingCabins } = useAllCabins();

    const { guests, isLoading: isLoadingGuests } = useAllGuests();

    const moveBack = useMoveBack();

    const navigate = useNavigate();

    const { cabinId: cabinIdUrl } = useParams();

    const { isPopoverOpen, openPopover, closePopover, boxContainerPopoverRef } =
        usePopover();

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

    const cabinIdInput = watch("cabinId");
    const startDateInput = watch("startDate");
    const endDateInput = watch("endDate");

    const { availability } = useAvailability(
        cabinIdInput,
        startDateInput,
        endDateInput
    );

    const { isAvailable } = availability;

    const { range, setRange, handleDayClick, handleResetRange } = useDatePicker();

    const { bookedDates, isLoadingBookedDates } = useGetBookingsByCabin(
        Number(cabinIdInput)
    );

    if (
        isLoadingSettings ||
        isLoadingCabins ||
        isLoadingGuests ||
        isLoadingBookedDates
    )
        return <Spinner />;

    const numNightsInput =
        startDateInput && endDateInput && endDateInput > startDateInput
            ? subtractDates(endDateInput, startDateInput)
            : 0;

    const cabinOptions = [
        { value: "", label: "Select a Cabin" },
        ...cabins
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((cabin) => ({
                value: cabin.id,
                label: `${cabin.name}  (${cabin.maxCapacity} guests)`,
            })),
    ];

    const guestOptions = [
        { value: "", label: "Select a Guest" },
        ...guests
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
                        ? "Check in cannot before today"
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
        navigate("/bookings/new");
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
                navigate('/bookings')
            },
        });
    }

    function onError(errors) {
        console.log(errors);
    }

    return (
        <>
            <div>
                <ButtonText className="button-back" onClick={moveBack}>
                    &larr; Back
                </ButtonText>
            </div>

            <Row type="form" style={{ justifyContent: 'flex-start', textAlign: 'left' }}>
                <MainHeading isDarkMode={isDarkMode}>

                    <Heading as="h1">
                        <span>
                            <HiOutlineSquare3Stack3D />
                        </span>
                        {cabinIdInput ? `Book Cabin ${cabinInput?.name}` : "Book Cabin"}
                        <span>
                            <Popover
                                isOpen={isPopoverOpen}
                                positions={
                                    width >= windowSizes.tablet
                                        ? ["right", "bottom"]
                                        : ["bottom", "right"]
                                }
                                padding={10}
                                reposition={false}
                                onClickOutside={closePopover}
                                parentElement={boxContainerPopoverRef.current}
                                content={({ position, childRect, popoverRect }) => (
                                    <ArrowContainer
                                        position={position}
                                        childRect={childRect}
                                        popoverRect={popoverRect}
                                        arrowColor={"var(--color-grey-400)"}
                                        arrowSize={8}
                                    >
                                        <PopoverContent>
                                            &#10095; First, check if the cabin is available for the
                                            selected dates. Then fill out the rest of the form to
                                            complete your booking.
                                        </PopoverContent>
                                    </ArrowContainer>
                                )}
                            >
                                <ButtonText
                                    type="form"
                                    onClick={openPopover}
                                    onMouseEnter={openPopover}
                                    onMouseLeave={closePopover}
                                    whileHover={{ scale: 1.8 }}
                                    whileTap={
                                        width >= windowSizes.tablet ? { scale: 1 } : { scale: 2 }
                                    }
                                    transition={{ duration: 0.3, type: "spring", stiffness: 500 }}
                                >
                                    <HiOutlineQuestionMarkCircle />
                                </ButtonText>
                            </Popover>
                        </span>
                    </Heading>
                </MainHeading>
            </Row>

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

                            <FormRow label="Guest Name" error={errors?.guestId?.message}>
                                <Controller
                                    name="guestId"
                                    control={control}
                                    rules={bookingValidation.guestId}
                                    render={({ field: { ref, value, onChange } }) => (
                                        <Select
                                            ref={ref}
                                            options={guestOptions}
                                            value={value}
                                            onChange={(e) => onChange(e.target.value)}
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
                        {/* comment */}
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
                                            value={value}
                                            onChange={(e) => onChange(e.target.value)}
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

export default CreateBookingForm;
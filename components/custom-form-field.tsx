/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from "react-hook-form";
import { FormFieldType } from "./forms/patient-form";
import Image from "next/image";
import PhoneInput from "react-phone-number-input";
import ReactDatePicker from "react-datepicker";
import { Select, SelectContent, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import "react-datepicker/dist/react-datepicker.css";
import "react-phone-number-input/style.css";

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const { fieldType, placeholder, iconSrc, iconAlt, renderSkeleton } = props;

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-gray-500 bg-black/40">
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || "icon"}
              height={24}
              width={24}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              // placeholder:!text-black/600
              className=" h-11 focus-visible:ring-0 focus-visible:ring-offset-0 border-0"
            />
          </FormControl>
        </div>
      );
      break;
    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry="IN"
            international
            placeholder={placeholder}
            value={field.value}
            onChange={field.onChange}
            className="mt-2 h-11 rounded-md px-2 text-sm border !border-gray-500 placeholder:text-black/60"
          />
        </FormControl>
      );
    case FormFieldType.DATE_PICKER:
      return (
        <div className="flex rounded-md border !border-gray-500">
          <Image
            src="/assets/icons/calendar.svg"
            height={24}
            width={24}
            alt="calendar"
            className="ml-2"
          />
          <FormControl>
            <ReactDatePicker
              showTimeSelect={props.showTimeSelect ?? false}
              selected={field.value}
              onChange={(date: Date | null) => field.onChange(date)}
              timeInputLabel="Time:"
              dateFormat={props.dateFormat ?? "MM/dd/yyyy"}
              wrapperClassName="date-picker"
              className="border-none outline-none ml-2  h-11 w-full overflow-hidden border-transparent text-xs sm:font-medium rounded-md px-3"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
    case FormFieldType.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className="!border-gray-500 bg-black/40 border w-full px-2 placeholder:text-black/60 h-11 focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className="bg-gray-900 !border-gray-500">
              {props.children}
            </SelectContent>
          </Select>
        </FormControl>
      );
    case FormFieldType.TEXTAREA:
      return (
        <FormControl>
          <Textarea
            placeholder={placeholder}
            {...field}
            disabled={props.disabled}
            className="focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </FormControl>
      );
    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className="flex items-center gap-4">
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
              className="h-[16px] w-[16px]"
            />
            <label
              htmlFor={props.name}
              className="cursor-pointer text-sm font-medium text-gray-200 
              peer-disabled:cursor-not-allowed peer-disabled:opacity-70 md:leading-none"
            >
              {props.label}
            </label>
          </div>
        </FormControl>
      );
    default:
      break;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel>{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />
          <FormMessage className="text-red-400" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;

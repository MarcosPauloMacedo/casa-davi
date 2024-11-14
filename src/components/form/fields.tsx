import { 
    FormControl, 
    FormDescription, 
    FormField, 
    FormItem, 
    FormLabel, 
    FormMessage 
} from "../ui/form";

import { 
    InputOTP, 
    InputOTPGroup, 
    InputOTPSeparatorDot, 
    InputOTPSeparatorMinus, 
    InputOTPSlot 
} from "../ui/input-otp";

import { 
    Select, 
    SelectContent, 
    SelectItem, 
    SelectTrigger, 
    SelectValue 
} from "../ui/select";

import { UseFormReturn } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";

import styles from './form.module.css';
import { ISelectItem } from "@/interfaces/ISelectItem";
import { Textarea } from "../ui/textarea";

interface IFieldProps {
    form: UseFormReturn<any>;
    name: string;
    label: string;
    className?: string;
    typeInput?: React.HTMLInputTypeAttribute
    placeholder?: string;
    description?: string;
    selectItems?: ISelectItem[]
}


function Field({ form, name, label, className, typeInput, placeholder,
    description }: IFieldProps) {

    const type = typeInput || "text";
    
    return (
        <div className={className}>
            <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className='text-primary-theme'>{label}</FormLabel>
                        <FormControl>
                            <Input className={styles.input} type={type} placeholder={placeholder} {...field} />
                        </FormControl>
                        <FormDescription>
                            {description}
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}

function FieldCheckbox({ className, form, name, label, description } : IFieldProps) {
    return (
        <div className={className}>
            <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                    <FormItem className={styles.fieldFormItem}>
                        <FormControl>
                            <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                            />
                        </FormControl>
                        <div className={styles.fieldCheckboxInfo}>
                            <FormLabel className='text-primary-theme'>
                                {label}
                            </FormLabel>
                            <FormDescription>
                            {description}
                            </FormDescription>
                        </div>
                    </FormItem>
                )}
            />
        </div>
    )
}

interface InputOTPSlotListProps {
    length: number;
    index?: number;
}

function InputOTPSlotList({ length, index = 0 }: InputOTPSlotListProps) {
    return (
        <>
            {Array.from({ length: length }, (_, i) => (
                <InputOTPSlot 
                    key={i} 
                    className={styles.inputOTPSlot}
                    index={i + index} 
                />
            ))}
        </>
    )
}

function FieldCPF({ className, form, name, label, description}: IFieldProps) {
    return (
        <div className={className}>
            <FormField
                control={form.control}
                name={name}
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className='text-primary-theme'>
                            {label}
                        </FormLabel>
                        <FormControl>
                            <InputOTP maxLength={11} {...field}>
                                <InputOTPGroup>
                                    <InputOTPSlotList length={3} />
                                </InputOTPGroup>
                                <InputOTPSeparatorDot className={styles.separator} />
                                <InputOTPGroup>
                                    <InputOTPSlotList length={3} index={3} />
                                </InputOTPGroup>
                                <InputOTPSeparatorDot className={styles.separator} />
                                <InputOTPGroup>
                                    <InputOTPSlotList length={3} index={6} />
                                </InputOTPGroup>
                                <InputOTPSeparatorMinus className={styles.separator} />
                                <InputOTPGroup>
                                    <InputOTPSlotList length={2} index={9} />
                                </InputOTPGroup>
                            </InputOTP>
                        </FormControl>
                        <FormDescription>
                            {description}
                        </FormDescription>
                    </FormItem>
                )}
            />
        </div>
    )
}

function FieldSelect({ className, form, name, label, placeholder, 
    description, selectItems }: IFieldProps) {

    return (
        <div className={className}>
            <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="text-primary-theme">{label}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {selectItems?.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormDescription>
                        {description}
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}/>
        </div>
    )
}

function FieldTextArea({ form, name, label, placeholder, 
    className, description }: IFieldProps) {

    return (
        <div className={className}>
            <FormField
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                   <FormLabel className='text-primary-theme'>
                        {label}
                    </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={placeholder}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    {description}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
    )
}

export { Field, FieldCheckbox, FieldCPF, FieldSelect, FieldTextArea };
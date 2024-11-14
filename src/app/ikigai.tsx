/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface IkigaiProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
  isLoading: boolean;
  initialData?: any;
}

export default function Ikigai({
  onSubmit,
  isLoading,
  initialData,
}: IkigaiProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ defaultValues: initialData });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 w-full max-w-2xl"
    >
      <div>
        <Label htmlFor="activity">
          What is the activity that you love doing the most in life?
        </Label>
        <Input
          id="activity"
          {...register("activity", { required: true, maxLength: 50 })}
          placeholder="Short text input with maximum three words"
        />
        {errors.activity && (
          <span className="text-red-500">
            This field is required and should be max 50 characters
          </span>
        )}
      </div>
      <div>
        <Label htmlFor="marketPotential">
          Is this activity needed or sought after in the market?
        </Label>
        <Controller
          name="marketPotential"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select market potential" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">
                  Yes, this activity has commercial and leisurely potential.
                </SelectItem>
                <SelectItem value="no">
                  No, this activity only has personal value.
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.marketPotential && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>
      <div>
        <Label htmlFor="skillLevel">
          How much would you rate your skill at this activity?
        </Label>
        <Controller
          name="skillLevel"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select skill level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="veryGood">
                  I am very good at this.
                </SelectItem>
                <SelectItem value="moderatelyGood">
                  I am moderately good at this.
                </SelectItem>
                <SelectItem value="learning">
                  I am still learning it.
                </SelectItem>
                <SelectItem value="notGood">I am not good at it.</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.skillLevel && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>
      <div>
        <Label htmlFor="payPotential">
          Is this activity well paid for in the market?
        </Label>
        <Controller
          name="payPotential"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select pay potential" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="noPotential">
                  It does not have any pay potential.
                </SelectItem>
                <SelectItem value="moderatePay">
                  It is moderately paid.
                </SelectItem>
                <SelectItem value="highPay">It is highly paid.</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.payPotential && (
          <span className="text-red-500">This field is required</span>
        )}
      </div>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save and Continue"}
      </Button>
    </form>
  );
}

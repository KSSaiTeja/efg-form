/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect } from "react";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Define the structure for the form data
interface IkigaiFormData {
  activity: string;
  marketPotential: "high" | "medium" | "low";
  skillLevel: "expert" | "intermediate" | "beginner";
  payPotential: "high" | "medium" | "low";
}

// Define the props for the Ikigai component
interface IkigaiProps {
  onSubmit: (data: any) => void;
  onPrevious: () => void;
  isLoading: boolean;
  initialData?: any;
  isRequired: boolean;
}

export default function Ikigai({
  onSubmit,
  onPrevious,
  isLoading,
  initialData,
}: IkigaiProps) {
  // Initialize the form with react-hook-form
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    trigger,
  } = useForm<IkigaiFormData>({
    defaultValues: initialData,
    mode: "onChange",
  });

  useEffect(() => {
    // Trigger validation when component mounts or when initialData changes
    trigger();
  }, [trigger, initialData]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 w-full max-w-2xl"
    >
      <Card>
        <CardHeader>
          <CardTitle>IKIGAI</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="activity">What activity do you love doing?</Label>
            <Input
              id="activity"
              {...register("activity", { required: "This field is required" })}
            />
            {errors.activity && (
              <span className="text-red-500 text-sm">
                {errors.activity.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="marketPotential">
              What is the market potential for this activity?
            </Label>
            <Controller
              name="marketPotential"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger id="marketPotential">
                    <SelectValue placeholder="Select market potential" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.marketPotential && (
              <span className="text-red-500 text-sm">
                {errors.marketPotential.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="skillLevel">
              What is your skill level in this activity?
            </Label>
            <Controller
              name="skillLevel"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger id="skillLevel">
                    <SelectValue placeholder="Select skill level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="expert">Expert</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.skillLevel && (
              <span className="text-red-500 text-sm">
                {errors.skillLevel.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="payPotential">
              What is the pay potential for this activity?
            </Label>
            <Controller
              name="payPotential"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger id="payPotential">
                    <SelectValue placeholder="Select pay potential" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.payPotential && (
              <span className="text-red-500 text-sm">
                {errors.payPotential.message}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          type="button"
          onClick={onPrevious}
          variant="outline"
          disabled={isLoading}
        >
          Previous
        </Button>

        <Button type="submit" disabled={isLoading || (!isDirty && !isValid)}>
          {isLoading ? "Submitting..." : "Next"}
        </Button>
      </div>
    </form>
  );
}

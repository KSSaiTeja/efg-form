/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
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

// Define the structure for a single goal
interface Goal {
  name: string;
  targetAmount: number;
  date: string;
  priority: "low" | "medium" | "high" | "critical";
  lumpsum: number;
}

// Define the structure for the form data
interface GoalsFormData {
  goals: Goal[];
}

// Define the props for the Goals component
interface GoalsProps {
  onSubmit: (data: any) => void;
  onPrevious: () => void;
  isLoading: boolean;
  initialData?: any;
  isRequired: boolean;
}

export default function Goals({
  onSubmit,
  onPrevious,
  isLoading,
  initialData,
}: GoalsProps) {
  // Initialize the form with react-hook-form
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    trigger,
  } = useForm<GoalsFormData>({
    defaultValues: initialData || { goals: [] },
    mode: "onChange",
  });

  // Use useFieldArray to handle dynamic form fields for goals
  const { fields, append, remove } = useFieldArray({
    control,
    name: "goals",
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
          <CardTitle>Goals (Optional)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {fields.map((field, index) => (
            <Card key={field.id}>
              <CardHeader>
                <CardTitle>Goal {index + 1}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor={`goals.${index}.name`}>Goal Name</Label>
                  <Input
                    id={`goals.${index}.name`}
                    {...register(`goals.${index}.name` as const)}
                    placeholder="Enter goal name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`goals.${index}.targetAmount`}>
                    Target Amount
                  </Label>
                  <Input
                    id={`goals.${index}.targetAmount`}
                    {...register(`goals.${index}.targetAmount` as const, {
                      valueAsNumber: true,
                      min: { value: 0, message: "Amount must be positive" },
                    })}
                    placeholder="Enter target amount"
                    type="number"
                  />
                  {errors.goals?.[index]?.targetAmount && (
                    <span className="text-red-500 text-sm">
                      {errors.goals[index]?.targetAmount?.message}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`goals.${index}.date`}>Target Date</Label>
                  <Input
                    id={`goals.${index}.date`}
                    {...register(`goals.${index}.date` as const)}
                    placeholder="Select target date"
                    type="date"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`goals.${index}.priority`}>Priority</Label>
                  <Controller
                    name={`goals.${index}.priority` as const}
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger id={`goals.${index}.priority`}>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="critical">Critical</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor={`goals.${index}.lumpsum`}>
                    Lumpsum Available
                  </Label>
                  <Input
                    id={`goals.${index}.lumpsum`}
                    {...register(`goals.${index}.lumpsum` as const, {
                      valueAsNumber: true,
                      min: { value: 0, message: "Amount must be positive" },
                    })}
                    placeholder="Enter lumpsum amount available"
                    type="number"
                  />
                  {errors.goals?.[index]?.lumpsum && (
                    <span className="text-red-500 text-sm">
                      {errors.goals[index]?.lumpsum?.message}
                    </span>
                  )}
                </div>

                <Button
                  type="button"
                  onClick={() => remove(index)}
                  variant="destructive"
                  className="w-full"
                >
                  Remove Goal
                </Button>
              </CardContent>
            </Card>
          ))}

          <Button
            type="button"
            onClick={() =>
              append({
                name: "",
                targetAmount: 0,
                date: "",
                priority: "medium",
                lumpsum: 0,
              })
            }
            className="w-full"
          >
            Add Goal
          </Button>
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
        <Button
          type="submit"
          disabled={isLoading || (!isDirty && !isValid)}
          className="ml-auto"
        >
          {isLoading ? "Submitting..." : "Next"}
        </Button>
      </div>
    </form>
  );
}

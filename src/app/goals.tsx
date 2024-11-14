/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

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

interface Goal {
  name: string;
  targetAmount: number;
  date: string;
  priority: "low" | "medium" | "high" | "critical";
  lumpsum: number;
}

interface GoalsFormData {
  goals: Goal[];
}

interface GoalsProps {
  onSubmit: (data: unknown) => void;
  isLoading: boolean;
  initialData?: unknown;
}

export default function Goals({
  onSubmit,
  isLoading,
  initialData,
}: GoalsProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<GoalsFormData>({
    defaultValues: initialData || { goals: [] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "goals",
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 w-full max-w-2xl"
    >
      {fields.map((field, index) => (
        <Card key={field.id} className="shadow-md">
          <CardHeader>
            <CardTitle>Goal {index + 1}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`goals.${index}.name`}>Goal Name</Label>
              <Input
                id={`goals.${index}.name`}
                {...register(`goals.${index}.name` as const, {
                  required: "Goal name is required",
                })}
                placeholder="Enter goal name"
              />
              {errors.goals?.[index]?.name && (
                <span className="text-red-500 text-sm">
                  {errors.goals[index]?.name?.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={`goals.${index}.targetAmount`}>
                Target Amount
              </Label>
              <Input
                id={`goals.${index}.targetAmount`}
                {...register(`goals.${index}.targetAmount` as const, {
                  required: "Target amount is required",
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
                {...register(`goals.${index}.date` as const, {
                  required: "Target date is required",
                })}
                placeholder="Select target date"
                type="date"
              />
              {errors.goals?.[index]?.date && (
                <span className="text-red-500 text-sm">
                  {errors.goals[index]?.date?.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={`goals.${index}.priority`}>Priority</Label>
              <Controller
                name={`goals.${index}.priority` as const}
                control={control}
                rules={{ required: "Priority is required" }}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
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
              {errors.goals?.[index]?.priority && (
                <span className="text-red-500 text-sm">
                  {errors.goals[index]?.priority?.message}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor={`goals.${index}.lumpsum`}>
                Lumpsum Available
              </Label>
              <Input
                id={`goals.${index}.lumpsum`}
                {...register(`goals.${index}.lumpsum` as const, {
                  required: "Lumpsum amount is required",
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

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save and Continue"}
      </Button>
    </form>
  );
}

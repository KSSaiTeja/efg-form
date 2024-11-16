/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useForm, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface FinancialProfileFormData {
  incomeGrowth: "<6%" | ">6%" | "doNotKnow";
  primaryDecisionMaker: "yes" | "no" | "complicated";
  contingencyFund: ">=6months" | "<6months" | "noFund";
  monthlyExpenditure: number;
}

interface FinancialProfileProps {
  onSubmit: (data: any) => void;
  onPrevious: () => void;
  isLoading: boolean;
  initialData?: any;
  isRequired: boolean;
}

export default function FinancialProfileProps({
  onSubmit,
  onPrevious,
  isLoading,
  initialData,
  isRequired,
}: FinancialProfileProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<FinancialProfileFormData>({
    defaultValues: initialData,
    mode: "onChange",
  });

  const renderError = (error?: { message?: string }) =>
    error?.message && (
      <span className="text-red-500 text-sm">{error.message}</span>
    );

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Financial Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="incomeGrowth">
              What is the estimated growth of your income annually?
            </Label>
            <Controller
              name="incomeGrowth"
              control={control}
              rules={{ required: "Income growth is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="incomeGrowth">
                    <SelectValue placeholder="Select income growth" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<6%">&lt; 6%</SelectItem>
                    <SelectItem value=">6%">&gt; 6%</SelectItem>
                    <SelectItem value="doNotKnow">Do not know</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {renderError(errors.incomeGrowth)}
          </div>

          <div className="space-y-2">
            <Label htmlFor="primaryDecisionMaker">
              Are you the primary financial decision maker in your household?
            </Label>
            <Controller
              name="primaryDecisionMaker"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="primaryDecisionMaker">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                    <SelectItem value="complicated">
                      It&apos;s complicated
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {renderError(errors.primaryDecisionMaker)}
          </div>

          <div className="space-y-2">
            <Label htmlFor="contingencyFund">
              How much amount have you set aside for your contingency fund?
            </Label>
            <Controller
              name="contingencyFund"
              control={control}
              rules={{ required: "Contingency fund information is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="contingencyFund">
                    <SelectValue placeholder="Select contingency fund amount" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value=">=6months">
                      ≥ 6 months of expenditure
                    </SelectItem>
                    <SelectItem value="<6months">
                      &lt; 6 months of expenditure
                    </SelectItem>
                    <SelectItem value="noFund">No contingency fund</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {renderError(errors.contingencyFund)}
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlyExpenditure">
              What is your monthly expenditure?
            </Label>
            <Controller
              name="monthlyExpenditure"
              control={control}
              rules={{
                required: "Monthly expenditure is required",
                min: {
                  value: 0,
                  message: "Monthly expenditure must be a positive number",
                },
              }}
              render={({ field }) => (
                <Input
                  id="monthlyExpenditure"
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  placeholder="Enter amount"
                />
              )}
            />
            {renderError(errors.monthlyExpenditure)}
          </div>

          <div className="flex justify-between">
            <Button
              type="button"
              onClick={onPrevious}
              variant={"outline"}
              disabled={isLoading}
            >
              Previous
            </Button>
            <Button
              type="submit"
              disabled={isLoading || (!isDirty && !isValid)}
              // className="ml-auto"
            >
              {isLoading ? "Submitting..." : "Next"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

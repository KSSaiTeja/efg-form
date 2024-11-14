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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface InvestmentProfileFormData {
  investmentHorizon: "3-5" | "5-7" | ">7";
  investmentReason:
    | "general"
    | "wealthCreation"
    | "monthlyIncome"
    | "taxSaving"
    | "retirementPlanning"
    | "diversification";
  expectedReturn: "7-12" | "12-15" | "15-18" | "18-25" | ">25";
  investmentExperience:
    | "currentlyInvested"
    | "pastInvestment"
    | "neverInvested";
  riskTolerance: "high" | "moderate" | "low" | "unsure";
  marketDownturnReaction: "exit" | "remain" | "invest";
  investmentPreference: "businessA" | "businessB" | "neither";
}

interface InvestmentProfileProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
  initialData?: any;
}

export default function InvestmentProfile({
  onSubmit,
  isLoading,
  initialData,
}: InvestmentProfileProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<InvestmentProfileFormData>({
    defaultValues: initialData,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 w-full max-w-2xl"
    >
      <Card>
        <CardHeader>
          <CardTitle>Investment Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="investmentHorizon">Investment horizon</Label>
            <Controller
              name="investmentHorizon"
              control={control}
              rules={{ required: "Investment horizon is required" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger id="investmentHorizon">
                    <SelectValue placeholder="Select investment horizon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3-5">3 - 5 years</SelectItem>
                    <SelectItem value="5-7">5 - 7 years</SelectItem>
                    <SelectItem value=">7">&gt; 7 years</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.investmentHorizon && (
              <span className="text-red-500 text-sm">
                {errors.investmentHorizon.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="investmentReason">
              Why are you looking to invest in the stock market?
            </Label>
            <Controller
              name="investmentReason"
              control={control}
              rules={{ required: "Investment reason is required" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger id="investmentReason">
                    <SelectValue placeholder="Select investment reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="wealthCreation">
                      Wealth Creation
                    </SelectItem>
                    <SelectItem value="monthlyIncome">
                      Monthly Income Generation
                    </SelectItem>
                    <SelectItem value="taxSaving">Tax Saving</SelectItem>
                    <SelectItem value="retirementPlanning">
                      Retirement Planning
                    </SelectItem>
                    <SelectItem value="diversification">
                      Diversification
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.investmentReason && (
              <span className="text-red-500 text-sm">
                {errors.investmentReason.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="expectedReturn">
              What is your expected return from stock market investments? (CAGR)
            </Label>
            <Controller
              name="expectedReturn"
              control={control}
              rules={{ required: "Expected return is required" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger id="expectedReturn">
                    <SelectValue placeholder="Select expected return" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7-12">7% - 12%</SelectItem>
                    <SelectItem value="12-15">12% - 15%</SelectItem>
                    <SelectItem value="15-18">15% - 18%</SelectItem>
                    <SelectItem value="18-25">18% - 25%</SelectItem>
                    <SelectItem value=">25">&gt;25%</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.expectedReturn && (
              <span className="text-red-500 text-sm">
                {errors.expectedReturn.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="investmentExperience">
              Have you ever invested in stocks or mutual funds before?
            </Label>
            <Controller
              name="investmentExperience"
              control={control}
              rules={{ required: "Investment experience is required" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger id="investmentExperience">
                    <SelectValue placeholder="Select investment experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="currentlyInvested">
                      I am invested at the moment.
                    </SelectItem>
                    <SelectItem value="pastInvestment">
                      I have invested in the past but have no active
                      investments.
                    </SelectItem>
                    <SelectItem value="neverInvested">
                      I have never invested before.
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.investmentExperience && (
              <span className="text-red-500 text-sm">
                {errors.investmentExperience.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="riskTolerance">
              How would you describe your risk tolerance?
            </Label>
            <Controller
              name="riskTolerance"
              control={control}
              rules={{ required: "Risk tolerance is required" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger id="riskTolerance">
                    <SelectValue placeholder="Select risk tolerance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">
                      High risk tolerance & seeking higher returns
                    </SelectItem>
                    <SelectItem value="moderate">
                      Moderate risk tolerance & a balanced approach
                    </SelectItem>
                    <SelectItem value="low">
                      Low risk tolerance & prioritizing capital preservation
                    </SelectItem>
                    <SelectItem value="unsure">Not sure / undecided</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.riskTolerance && (
              <span className="text-red-500 text-sm">
                {errors.riskTolerance.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="marketDownturnReaction">
              What would you do if your portfolio lost 25% of its value
              (unrealized losses) during a market recession?
            </Label>
            <Controller
              name="marketDownturnReaction"
              control={control}
              rules={{ required: "Market downturn reaction is required" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger id="marketDownturnReaction">
                    <SelectValue placeholder="Select reaction" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="exit">
                      Exit my investments immediately
                    </SelectItem>
                    <SelectItem value="remain">
                      Remain invested without any change
                    </SelectItem>
                    <SelectItem value="invest">
                      Invest further into the market
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.marketDownturnReaction && (
              <span className="text-red-500 text-sm">
                {errors.marketDownturnReaction.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="investmentPreference">
              Would you prefer to invest in business A, that is expected to
              return 18% with a 40% chance of losing capital or business B, that
              returns 16% with a 36% chance of losing capital?
            </Label>
            <Controller
              name="investmentPreference"
              control={control}
              rules={{ required: "Investment preference is required" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger id="investmentPreference">
                    <SelectValue placeholder="Select preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="businessA">Business A</SelectItem>
                    <SelectItem value="businessB">Business B</SelectItem>
                    <SelectItem value="neither">Neither</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.investmentPreference && (
              <span className="text-red-500 text-sm">
                {errors.investmentPreference.message}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save and Continue"}
      </Button>
    </form>
  );
}

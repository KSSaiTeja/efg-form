/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect } from "react";
import {
  useForm,
  useFieldArray,
  Controller,
  FieldError,
} from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SavartOneFormData {
  hasFinancialDependents: "yes" | "no";
  dependents?: Array<{
    name: string;
    relation: string;
    age: number;
  }>;
  primaryIncome: number;
  rentalIncome?: number;
  dividends?: number;
  bonusIncome?: number;
  otherIncome?: number;
  realEstateChanges?: string;
  investmentKnowledge: "novice" | "intermediate" | "experienced" | "expert";
  medicalConditions?: string;
  insuranceCoverage: "multiple" | "single" | "none";
  insurancePolicies?: Array<{
    holderName: string;
    nature: "life" | "health" | "auto" | "home" | "others";
    startDate: string;
    tenure: string;
    mode: string;
    premium: number;
    sumAssured: number;
  }>;
  vehicleOwnership: "car" | "bike" | "no";
  vehicles?: Array<{
    type: "car" | "bike";
    purchaseYear: number;
  }>;
  loans: Array<{
    nature:
      | "property"
      | "personal"
      | "educational"
      | "home"
      | "vehicle"
      | "other";
    interestRate: number;
    emi: number;
    tenure: string;
    startDate: string;
    amount: number;
  }>;
  financialSatisfaction:
    | "verySatisfied"
    | "satisfied"
    | "neutral"
    | "dissatisfied"
    | "veryDissatisfied";
  additionalInfo?: string;
  expectations: string;
}

interface SavartOneProps {
  onSubmit: (data: any) => void;
  onPrevious: () => void;
  isLoading: boolean;
  initialData?: any;
  isRequired: boolean;
}

export default function SavartOne({
  onSubmit,
  onPrevious,
  isLoading,
  initialData,
  isRequired,
}: SavartOneProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<SavartOneFormData>({
    defaultValues: initialData,
  });
  const {
    fields: dependentFields,
    append: appendDependent,
    remove: removeDependent,
  } = useFieldArray({
    control,
    name: "dependents",
  });
  const {
    fields: insuranceFields,
    append: appendInsurance,
    remove: removeInsurance,
  } = useFieldArray({
    control,
    name: "insurancePolicies",
  });
  const {
    fields: loanFields,
    append: appendLoan,
    remove: removeLoan,
  } = useFieldArray({
    control,
    name: "loans",
  });
  const {
    fields: vehicleFields,
    append: appendVehicle,
    remove: removeVehicle,
  } = useFieldArray({
    control,
    name: "vehicles",
  });

  const hasFinancialDependents = watch("hasFinancialDependents");
  const insuranceCoverage = watch("insuranceCoverage");
  const vehicleOwnership = watch("vehicleOwnership");

  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        setValue(key as keyof SavartOneFormData, value as any);
      });
    }
  }, [initialData, setValue]);

  const getErrorMessage = (error: any) => {
    return error?.message || "This field is required";
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Savart One</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Financial Dependents Section */}
          <div className="space-y-2">
            <Label htmlFor="hasFinancialDependents">
              Do you have any financial dependents in your family?
            </Label>
            <Controller
              name="hasFinancialDependents"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="hasFinancialDependents">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.hasFinancialDependents && (
              <span className="text-red-500">
                {getErrorMessage(errors.hasFinancialDependents)}
              </span>
            )}
          </div>

          {hasFinancialDependents === "yes" && (
            <div className="space-y-2">
              <Label>Please introduce your dependents</Label>
              {dependentFields.map((field, index) => (
                <div key={field.id} className="space-y-2 p-4 border rounded">
                  <Input
                    {...register(`dependents.${index}.name` as const, {
                      required: "Name is required",
                    })}
                    placeholder="Name"
                  />
                  {errors.dependents?.[index]?.name && (
                    <span className="text-red-500">
                      {getErrorMessage(errors.dependents?.[index]?.name)}
                    </span>
                  )}

                  <Input
                    {...register(`dependents.${index}.relation` as const, {
                      required: "Relation is required",
                    })}
                    placeholder="Relation"
                  />
                  {errors.dependents?.[index]?.relation && (
                    <span className="text-red-500">
                      {getErrorMessage(errors.dependents?.[index]?.relation)}
                    </span>
                  )}

                  <Input
                    {...register(`dependents.${index}.age` as const, {
                      required: "Age is required",
                      valueAsNumber: true,
                      min: { value: 0, message: "Age must be positive" },
                    })}
                    placeholder="Age"
                    type="number"
                  />
                  {errors.dependents?.[index]?.age && (
                    <span className="text-red-500">
                      {getErrorMessage(errors.dependents?.[index]?.age)}
                    </span>
                  )}

                  <Button
                    type="button"
                    onClick={() => removeDependent(index)}
                    variant="destructive"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() =>
                  appendDependent({
                    name: "",
                    relation: "",
                    age: undefined as any,
                  })
                }
              >
                Add Dependent
              </Button>
            </div>
          )}

          {/* Income Analysis Section */}
          <div className="space-y-2">
            <Label>Income Analysis (All numbers are monthly)</Label>
            <Input
              {...register("primaryIncome", {
                required: "Primary income is required",
                valueAsNumber: true,
                min: { value: 0, message: "Income must be positive" },
              })}
              placeholder="Current primary CTC/income"
              type="number"
            />
            {errors.primaryIncome && (
              <span className="text-red-500">
                {getErrorMessage(errors.primaryIncome)}
              </span>
            )}

            <Input
              {...register("rentalIncome", {
                valueAsNumber: true,
                min: { value: 0, message: "Income must be positive" },
              })}
              placeholder="Rental Income"
              type="number"
            />
            {errors.rentalIncome && (
              <span className="text-red-500">
                {getErrorMessage(errors.rentalIncome)}
              </span>
            )}

            <Input
              {...register("dividends", {
                valueAsNumber: true,
                min: { value: 0, message: "Income must be positive" },
              })}
              placeholder="Dividends"
              type="number"
            />
            {errors.dividends && (
              <span className="text-red-500">
                {getErrorMessage(errors.dividends)}
              </span>
            )}

            <Input
              {...register("bonusIncome", {
                valueAsNumber: true,
                min: { value: 0, message: "Income must be positive" },
              })}
              placeholder="Bonus or Additional Income"
              type="number"
            />
            {errors.bonusIncome && (
              <span className="text-red-500">
                {getErrorMessage(errors.bonusIncome)}
              </span>
            )}

            <Input
              {...register("otherIncome", {
                valueAsNumber: true,
                min: { value: 0, message: "Income must be positive" },
              })}
              placeholder="Any other income"
              type="number"
            />
            {errors.otherIncome && (
              <span className="text-red-500">
                {getErrorMessage(errors.otherIncome)}
              </span>
            )}
          </div>

          {/* Real Estate Changes Section */}
          <div className="space-y-2">
            <Label htmlFor="realEstateChanges">
              Do you have any planned changes upcoming to your real estate
              exposure?
            </Label>
            <Textarea
              id="realEstateChanges"
              {...register("realEstateChanges")}
              placeholder="Describe your planned changes"
            />
          </div>

          {/* Investment Knowledge Section */}
          <div className="space-y-2">
            <Label htmlFor="investmentKnowledge">
              How would you describe your investment knowledge and experience?
            </Label>
            <Controller
              name="investmentKnowledge"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="investmentKnowledge">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="novice">Novice</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="experienced">Experienced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.investmentKnowledge && (
              <span className="text-red-500">
                {getErrorMessage(errors.investmentKnowledge)}
              </span>
            )}
          </div>

          {/* Medical Conditions Section */}
          <div className="space-y-2">
            <Label htmlFor="medicalConditions">
              Do you have any pre-existing medical conditions?
            </Label>
            <Textarea
              id="medicalConditions"
              {...register("medicalConditions")}
              placeholder="Describe any pre-existing medical conditions"
            />
          </div>

          {/* Insurance Coverage Section */}
          <div className="space-y-2">
            <Label htmlFor="insuranceCoverage">
              What is the nature of your insurance coverage?
            </Label>
            <Controller
              name="insuranceCoverage"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="insuranceCoverage">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="multiple">
                      Yes, I have multiple insurance policies
                    </SelectItem>
                    <SelectItem value="single">
                      Yes, I have one insurance policy
                    </SelectItem>
                    <SelectItem value="none">
                      No, I don&apos;t have any insurance coverage
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.insuranceCoverage && (
              <span className="text-red-500">
                {getErrorMessage(errors.insuranceCoverage)}
              </span>
            )}
          </div>

          {(insuranceCoverage === "multiple" ||
            insuranceCoverage === "single") && (
            <div className="space-y-2">
              <Label>Please share details of your insurance policies</Label>
              {insuranceFields.map((field, index) => (
                <div key={field.id} className="space-y-2 p-4 border rounded">
                  <Input
                    {...register(
                      `insurancePolicies.${index}.holderName` as const,
                      { required: "Holder name is required" },
                    )}
                    placeholder="Name of Holder"
                  />
                  {errors.insurancePolicies?.[index]?.holderName && (
                    <span className="text-red-500">
                      {getErrorMessage(
                        errors.insurancePolicies?.[index]?.holderName,
                      )}
                    </span>
                  )}

                  <Controller
                    name={`insurancePolicies.${index}.nature` as const}
                    control={control}
                    rules={{ required: "Nature of insurance is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Nature of Insurance" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="life">Life</SelectItem>
                          <SelectItem value="health">Health</SelectItem>
                          <SelectItem value="auto">Auto</SelectItem>
                          <SelectItem value="home">Home</SelectItem>
                          <SelectItem value="others">Others</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.insurancePolicies?.[index]?.nature && (
                    <span className="text-red-500">
                      {getErrorMessage(
                        errors.insurancePolicies?.[index]?.nature,
                      )}
                    </span>
                  )}

                  <Input
                    {...register(
                      `insurancePolicies.${index}.startDate` as const,
                      { required: "Start date is required" },
                    )}
                    placeholder="Start Date"
                    type="date"
                  />
                  {errors.insurancePolicies?.[index]?.startDate && (
                    <span className="text-red-500">
                      {getErrorMessage(
                        errors.insurancePolicies?.[index]?.startDate,
                      )}
                    </span>
                  )}

                  <Input
                    {...register(`insurancePolicies.${index}.tenure` as const, {
                      required: "Tenure is required",
                    })}
                    placeholder="Tenure"
                  />
                  {errors.insurancePolicies?.[index]?.tenure && (
                    <span className="text-red-500">
                      {getErrorMessage(
                        errors.insurancePolicies?.[index]?.tenure,
                      )}
                    </span>
                  )}

                  <Input
                    {...register(`insurancePolicies.${index}.mode` as const, {
                      required: "Mode is required",
                    })}
                    placeholder="Mode"
                  />
                  {errors.insurancePolicies?.[index]?.mode && (
                    <span className="text-red-500">
                      {getErrorMessage(errors.insurancePolicies?.[index]?.mode)}
                    </span>
                  )}

                  <Input
                    {...register(
                      `insurancePolicies.${index}.premium` as const,
                      {
                        required: "Premium is required",
                        valueAsNumber: true,
                        min: { value: 0, message: "Premium must be positive" },
                      },
                    )}
                    placeholder="Premium"
                    type="number"
                  />
                  {errors.insurancePolicies?.[index]?.premium && (
                    <span className="text-red-500">
                      {getErrorMessage(
                        errors.insurancePolicies?.[index]?.premium,
                      )}
                    </span>
                  )}

                  <Input
                    {...register(
                      `insurancePolicies.${index}.sumAssured` as const,
                      {
                        required: "Sum assured is required",
                        valueAsNumber: true,
                        min: {
                          value: 0,
                          message: "Sum assured must be positive",
                        },
                      },
                    )}
                    placeholder="Sum Assured"
                    type="number"
                  />
                  {errors.insurancePolicies?.[index]?.sumAssured && (
                    <span className="text-red-500">
                      {getErrorMessage(
                        errors.insurancePolicies?.[index]?.sumAssured,
                      )}
                    </span>
                  )}

                  <Button
                    type="button"
                    onClick={() => removeInsurance(index)}
                    variant="destructive"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() =>
                  appendInsurance({
                    holderName: "",
                    nature: undefined as any,
                    startDate: "",
                    tenure: "",
                    mode: "",
                    premium: undefined as any,
                    sumAssured: undefined as any,
                  })
                }
              >
                Add Insurance Policy
              </Button>
            </div>
          )}

          {/* Vehicle Ownership Section */}
          <div className="space-y-2">
            <Label htmlFor="vehicleOwnership">Do you own a vehicle?</Label>
            <Controller
              name="vehicleOwnership"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="vehicleOwnership">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="car">Car</SelectItem>
                    <SelectItem value="bike">Bike</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.vehicleOwnership && (
              <span className="text-red-500">
                {getErrorMessage(errors.vehicleOwnership)}
              </span>
            )}
          </div>

          {vehicleOwnership && vehicleOwnership !== "no" && (
            <div className="space-y-2">
              <Label>Please provide details of your vehicles</Label>
              {vehicleFields.map((field, index) => (
                <div key={field.id} className="space-y-2 p-4 border rounded">
                  <Controller
                    name={`vehicles.${index}.type` as const}
                    control={control}
                    rules={{ required: "Vehicle type is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Vehicle Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="car">Car</SelectItem>
                          <SelectItem value="bike">Bike</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.vehicles?.[index]?.type && (
                    <span className="text-red-500">
                      {getErrorMessage(errors.vehicles?.[index]?.type)}
                    </span>
                  )}

                  <Input
                    {...register(`vehicles.${index}.purchaseYear` as const, {
                      required: "Purchase year is required",
                      valueAsNumber: true,
                      min: { value: 1900, message: "Invalid year" },
                      max: {
                        value: new Date().getFullYear(),
                        message: "Year cannot be in the future",
                      },
                    })}
                    placeholder="Year of Purchase"
                    type="number"
                  />
                  {errors.vehicles?.[index]?.purchaseYear && (
                    <span className="text-red-500">
                      {getErrorMessage(errors.vehicles?.[index]?.purchaseYear)}
                    </span>
                  )}

                  <Button
                    type="button"
                    onClick={() => removeVehicle(index)}
                    variant="destructive"
                  >
                    Remove
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                onClick={() =>
                  appendVehicle({
                    type: undefined as any,
                    purchaseYear: undefined as any,
                  })
                }
              >
                Add Vehicle
              </Button>
            </div>
          )}

          {/* Loans Section */}
          <div className="space-y-2">
            <Label>
              Please provide details of your outstanding loans or debt
            </Label>
            {loanFields.map((field, index) => (
              <div key={field.id} className="space-y-2 p-4 border rounded">
                <Controller
                  name={`loans.${index}.nature` as const}
                  control={control}
                  rules={{ required: "Loan nature is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Nature of Loan" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="property">Property</SelectItem>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="educational">Educational</SelectItem>
                        <SelectItem value="home">Home</SelectItem>
                        <SelectItem value="vehicle">Vehicle</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.loans?.[index]?.nature && (
                  <span className="text-red-500">
                    {getErrorMessage(errors.loans?.[index]?.nature)}
                  </span>
                )}

                <Input
                  {...register(`loans.${index}.interestRate` as const, {
                    required: "Interest rate is required",
                    valueAsNumber: true,
                    min: {
                      value: 0,
                      message: "Interest rate must be positive",
                    },
                    max: {
                      value: 100,
                      message: "Interest rate cannot exceed 100%",
                    },
                  })}
                  placeholder="Rate of Interest (%)"
                  type="number"
                  step="0.01"
                />
                {errors.loans?.[index]?.interestRate && (
                  <span className="text-red-500">
                    {getErrorMessage(errors.loans?.[index]?.interestRate)}
                  </span>
                )}

                <Input
                  {...register(`loans.${index}.emi` as const, {
                    required: "EMI is required",
                    valueAsNumber: true,
                    min: { value: 0, message: "EMI must be positive" },
                  })}
                  placeholder="EMI Amount"
                  type="number"
                />
                {errors.loans?.[index]?.emi && (
                  <span className="text-red-500">
                    {getErrorMessage(errors.loans?.[index]?.emi)}
                  </span>
                )}

                <Input
                  {...register(`loans.${index}.tenure` as const, {
                    required: "Tenure is required",
                  })}
                  placeholder="Loan Tenure"
                />
                {errors.loans?.[index]?.tenure && (
                  <span className="text-red-500">
                    {getErrorMessage(errors.loans?.[index]?.tenure)}
                  </span>
                )}

                <Input
                  {...register(`loans.${index}.startDate` as const, {
                    required: "Start date is required",
                  })}
                  placeholder="Start Date (MMYYYY)"
                />
                {errors.loans?.[index]?.startDate && (
                  <span className="text-red-500">
                    {getErrorMessage(errors.loans?.[index]?.startDate)}
                  </span>
                )}

                <Input
                  {...register(`loans.${index}.amount` as const, {
                    required: "Amount is required",
                    valueAsNumber: true,
                    min: { value: 0, message: "Amount must be positive" },
                  })}
                  placeholder="Amount"
                  type="number"
                />
                {errors.loans?.[index]?.amount && (
                  <span className="text-red-500">
                    {getErrorMessage(errors.loans?.[index]?.amount)}
                  </span>
                )}

                <Button
                  type="button"
                  onClick={() => removeLoan(index)}
                  variant="destructive"
                >
                  Remove
                </Button>
              </div>
            ))}
            <Button
              type="button"
              onClick={() =>
                appendLoan({
                  nature: undefined as any,
                  interestRate: undefined as any,
                  emi: undefined as any,
                  tenure: "",
                  startDate: "",
                  amount: undefined as any,
                })
              }
            >
              Add Loan
            </Button>
          </div>

          {/* Financial Satisfaction Section */}
          <div className="space-y-2">
            <Label htmlFor="financialSatisfaction">
              Are you presently satisfied with your life from a financial point
              of view?
            </Label>
            <Controller
              name="financialSatisfaction"
              control={control}
              rules={{ required: "This field is required" }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger id="financialSatisfaction">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="verySatisfied">
                      Very Satisfied
                    </SelectItem>
                    <SelectItem value="satisfied">Satisfied</SelectItem>
                    <SelectItem value="neutral">Neutral</SelectItem>
                    <SelectItem value="dissatisfied">Dissatisfied</SelectItem>
                    <SelectItem value="veryDissatisfied">
                      Very Dissatisfied
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.financialSatisfaction && (
              <span className="text-red-500">
                {getErrorMessage(errors.financialSatisfaction)}
              </span>
            )}
          </div>

          {/* Additional Information Section */}
          <div className="space-y-2">
            <Label htmlFor="additionalInfo">
              Is there anything else that you wish to share with your financial
              planner?
            </Label>
            <Textarea
              id="additionalInfo"
              {...register("additionalInfo")}
              placeholder="Additional information"
            />
          </div>

          {/* Expectations Section */}
          <div className="space-y-2">
            <Label htmlFor="expectations">
              In summary, what are your expectations from your financial
              planner?
            </Label>
            <Textarea
              id="expectations"
              {...register("expectations", {
                required: "This field is required",
              })}
              placeholder="Your expectations"
            />
            {errors.expectations && (
              <span className="text-red-500">
                {getErrorMessage(errors.expectations)}
              </span>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button type="button" onClick={onPrevious} variant="outline">
          Previous
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </form>
  );
}

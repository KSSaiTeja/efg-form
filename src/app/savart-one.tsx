/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useEffect } from "react"
import { useForm, useFieldArray, Controller } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface SavartOneProps {
  onSubmit: (data: unknown) => void
  isLoading: boolean
  initialData?: unknown
}

export default function SavartOne({ onSubmit, isLoading, initialData }: SavartOneProps) {
  const { register, control, handleSubmit, formState: { errors }, setValue, watch } = useForm()
  const { fields: dependentFields, append: appendDependent, remove: removeDependent } = useFieldArray({
    control,
    name: "dependents"
  })
  const { fields: insuranceFields, append: appendInsurance, remove: removeInsurance } = useFieldArray({
    control,
    name: "insurancePolicies"
  })
  const { fields: loanFields, append: appendLoan, remove: removeLoan } = useFieldArray({
    control,
    name: "loans"
  })
  const { fields: vehicleFields, append: appendVehicle, remove: removeVehicle } = useFieldArray({
    control,
    name: "vehicles"
  })

  const hasFinancialDependents = watch("hasFinancialDependents")
  const insuranceCoverage = watch("insuranceCoverage")
  const vehicleOwnership = watch("vehicleOwnership")

  useEffect(() => {
    if (initialData) {
      Object.entries(initialData).forEach(([key, value]) => {
        setValue(key, value)
      })
    }
  }, [initialData, setValue])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Financial Dependents Section */}
      <div>
        <Label htmlFor="hasFinancialDependents">Do you have any financial dependents in your family?</Label>
        <Controller
          name="hasFinancialDependents"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">Yes</SelectItem>
                <SelectItem value="no">No</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.hasFinancialDependents && <span className="text-red-500">This field is required</span>}
      </div>

      {hasFinancialDependents === "yes" && (
        <div>
          <Label>Please introduce your dependents</Label>
          {dependentFields.map((field, index) => (
            <div key={field.id} className="space-y-2 p-2 border rounded mt-2">
              <Input {...register(`dependents.${index}.name`, { required: true })} placeholder="Name" />
              <Input {...register(`dependents.${index}.relation`, { required: true })} placeholder="Relation" />
              <Input {...register(`dependents.${index}.age`, { required: true, min: 0 })} placeholder="Age" type="number" />
              <Button type="button" onClick={() => removeDependent(index)} variant="destructive">Remove</Button>
            </div>
          ))}
          <Button type="button" onClick={() => appendDependent({ name: "", relation: "", age: "" })} className="mt-2">Add Dependent</Button>
        </div>
      )}

      {/* Income Analysis Section */}
      <div className="space-y-2">
        <Label>Income Analysis (All numbers are monthly)</Label>
        <Input {...register("primaryIncome", { required: true, min: 0 })} placeholder="Current primary CTC/income" type="number" />
        <Input {...register("rentalIncome", { min: 0 })} placeholder="Rental Income" type="number" />
        <Input {...register("dividends", { min: 0 })} placeholder="Dividends" type="number" />
        <Input {...register("bonusIncome", { min: 0 })} placeholder="Bonus or Additional Income" type="number" />
        <Input {...register("otherIncome", { min: 0 })} placeholder="Any other income" type="number" />
      </div>

      {/* Real Estate Changes Section */}
      <div>
        <Label htmlFor="realEstateChanges">Do you have any planned changes upcoming to your real estate exposure?</Label>
        <Textarea {...register("realEstateChanges")} />
      </div>

      {/* Investment Knowledge Section */}
      <div>
        <Label htmlFor="investmentKnowledge">How would you describe your investment knowledge and experience?</Label>
        <Controller
          name="investmentKnowledge"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
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
        {errors.investmentKnowledge && <span className="text-red-500">This field is required</span>}
      </div>

      {/* Medical Conditions Section */}
      <div>
        <Label htmlFor="medicalConditions">Do you have any pre-existing medical conditions?</Label>
        <Textarea {...register("medicalConditions")} />
      </div>

      {/* Insurance Coverage Section */}
      <div>
        <Label htmlFor="insuranceCoverage">What is the nature of your insurance coverage?</Label>
        <Controller
          name="insuranceCoverage"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="multiple">Yes, I have multiple insurance policies</SelectItem>
                <SelectItem value="single">Yes, I have one insurance policy</SelectItem>
                <SelectItem value="none">No, I don&apos;t have any insurance coverage</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.insuranceCoverage && <span className="text-red-500">This field is required</span>}
      </div>

      {(insuranceCoverage === "multiple" || insuranceCoverage === "single") && (
        <div>
          <Label>Please share details of your insurance policies</Label>
          {insuranceFields.map((field, index) => (
            <div key={field.id} className="space-y-2 p-2 border rounded mt-2">
              <Input {...register(`insurancePolicies.${index}.holderName`, { required: true })} placeholder="Name of Holder" />
              <Controller
                name={`insurancePolicies.${index}.nature`}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              <Input {...register(`insurancePolicies.${index}.startDate`, { required: true })} placeholder="Start Date" type="date" />
              <Input {...register(`insurancePolicies.${index}.tenure`, { required: true })} placeholder="Tenure" />
              <Input {...register(`insurancePolicies.${index}.mode`, { required: true })} placeholder="Mode" />
              <Input {...register(`insurancePolicies.${index}.premium`, { required: true, min: 0 })} placeholder="Premium" type="number" />
              <Input {...register(`insurancePolicies.${index}.sumAssured`, { required: true, min: 0 })} placeholder="Sum Assured" type="number" />
              <Button type="button" onClick={() => removeInsurance(index)} variant="destructive">Remove</Button>
            </div>
          ))}
          <Button type="button" onClick={() => appendInsurance({ holderName: "", nature: "", startDate: "", tenure: "", mode: "", premium: "", sumAssured: "" })} className="mt-2">
            Add Insurance Policy
          </Button>
        </div>
      )}

      {/* Vehicle Ownership Section */}
      <div>
        <Label htmlFor="vehicleOwnership">Do you own a vehicle?</Label>
        <Controller
          name="vehicleOwnership"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
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
        {errors.vehicleOwnership && <span className="text-red-500">This field is required</span>}
      </div>

      {vehicleOwnership && vehicleOwnership !== "no" && (
        <div>
          <Label>Please provide details of your vehicles</Label>
          {vehicleFields.map((field, index) => (
            <div key={field.id} className="space-y-2 p-2 border rounded mt-2">
              <Controller
                name={`vehicles.${index}.type`}
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              <Input {...register(`vehicles.${index}.purchaseYear`, { required: true, min: 1900, max: new Date().getFullYear() })} placeholder="Year of Purchase" type="number" />
              <Button type="button" onClick={() => removeVehicle(index)} variant="destructive">Remove</Button>
            </div>
          ))}
          <Button type="button" onClick={() => appendVehicle({ type: "", purchaseYear: "" })} className="mt-2">Add Vehicle</Button>
        </div>
      )}

      {/* Loans Section */}
      <div>
        <Label>Please provide details of your outstanding loans or debt</Label>
        {loanFields.map((field, index) => (
          <div key={field.id} className="space-y-2 p-2 border rounded mt-2">
            <Controller
              name={`loans.${index}.nature`}
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
            <Input {...register(`loans.${index}.interestRate`, { required: true, min: 0, max: 100 })} placeholder="Rate of Interest (%)" type="number" />
            <Input {...register(`loans.${index}.emi`, { required: true, min: 0 })} placeholder="EMI Amount" type="number" />
            <Input {...register(`loans.${index}.tenure`, { required: true })} placeholder="Loan Tenure" />
            <Input {...register(`loans.${index}.startDate`, { required: true })} placeholder="Start Date (MMYYYY)" />
            <Input {...register(`loans.${index}.amount`, { required: true, min: 0 })} placeholder="Amount" type="number" />
            <Button type="button" onClick={() => removeLoan(index)} variant="destructive">Remove</Button>
          </div>
        ))}
        <Button type="button" onClick={() => appendLoan({ nature: "", interestRate: "", emi: "", tenure: "", startDate: "", amount: "" })} className="mt-2">
          Add Loan
        </Button>
      </div>

      {/* Financial Satisfaction Section */}
      <div>
        <Label htmlFor="financialSatisfaction">Are you presently satisfied with your life from a financial point of view?</Label>
        <Controller
          name="financialSatisfaction"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="verySatisfied">Very Satisfied</SelectItem>
                <SelectItem value="satisfied">Satisfied</SelectItem>
                <SelectItem value="neutral">Neutral</SelectItem>
                <SelectItem value="dissatisfied">Dissatisfied</SelectItem>
                <SelectItem value="veryDissatisfied">Very Dissatisfied</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.financialSatisfaction && <span className="text-red-500">This field is required</span>}
      </div>

      {/* Additional Information Section */}
      <div>
        <Label htmlFor="additionalInfo">Is there anything else that you wish to share with your financial planner?</Label>
        <Textarea {...register("additionalInfo")} />
      </div>

      {/* Expectations Section */}
      <div>
        <Label htmlFor="expectations">In summary, what are your expectations from your financial planner?</Label>
        <Textarea {...register("expectations", { required: true })} />
        {errors.expectations && <span className="text-red-500">This field is required</span>}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save and Continue"}
      </Button>
    </form>
  )
}
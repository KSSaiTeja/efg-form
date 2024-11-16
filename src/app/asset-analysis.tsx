/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export interface AssetAnalysisFormData {
  realEstate: Array<{
    nature: string;
    location: string;
    area: number | null;
    purchaseValue: number | null;
    currentValue: number | null;
  }>;
  reits: { currentValue: number | null };
  goldJewellery: { currentValue: number | null };
  chitFunds: {
    monthlyContribution: number | null;
    tenure: string;
    chitValue: number | null;
  };
  listedEquity: {
    purchaseValue: number | null;
    currentValue: number | null;
  };
  mutualFunds: {
    purchaseValue: number | null;
    currentValue: number | null;
  };
  fixedDeposit: {
    purchaseValue: number | null;
    currentValue: number | null;
  };
  eps: { currentValue: number | null };
  nps: { currentValue: number | null };
  ulip: { currentValue: number | null };
  bondsDebentures: { currentValue: number | null };
  alternativeInvestments: { currentValue: number | null };
  unsecuredLending: { currentValue: number | null };
  privateEquity: { currentValue: number | null };
  postalSavings: { currentValue: number | null };
  cashEquivalents: { currentValue: number | null };
}

interface AssetAnalysisProps {
  onSubmit: (data: any) => void;
  onPrevious: () => void;
  isLoading: boolean;
  initialData?: any;
  isRequired: boolean;
}

export default function AssetAnalysis({
  onSubmit,
  onPrevious,
  isLoading,
  initialData,
}: AssetAnalysisProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AssetAnalysisFormData>({
    defaultValues: initialData || {
      realEstate: [],
      reits: { currentValue: null },
      goldJewellery: { currentValue: null },
      chitFunds: {
        monthlyContribution: null,
        tenure: "",
        chitValue: null,
      },
      listedEquity: { purchaseValue: null, currentValue: null },
      mutualFunds: { purchaseValue: null, currentValue: null },
      fixedDeposit: { purchaseValue: null, currentValue: null },
      eps: { currentValue: null },
      nps: { currentValue: null },
      ulip: { currentValue: null },
      bondsDebentures: { currentValue: null },
      alternativeInvestments: { currentValue: null },
      unsecuredLending: { currentValue: null },
      privateEquity: { currentValue: null },
      postalSavings: { currentValue: null },
      cashEquivalents: { currentValue: null },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "realEstate",
  });

  const onSubmitForm = (data: AssetAnalysisFormData) => {
    Object.keys(data).forEach((key) => {
      const value = data[key as keyof AssetAnalysisFormData];
      if (typeof value === "object" && value !== null) {
        Object.keys(value).forEach((subKey) => {
          if ((value as any)[subKey] === "") {
            (value as any)[subKey] = null;
          }
        });
      }
    });
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitForm)}
      className="space-y-6 w-full max-w-2xl"
    >
      <Card>
        <CardHeader>
          <CardTitle>Asset Analysis (Optional)</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="real-estate">
              <AccordionTrigger>Real Estate</AccordionTrigger>
              <AccordionContent>
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="space-y-4 p-4 border rounded mb-4"
                  >
                    <Controller
                      name={`realEstate.${index}.nature`}
                      control={control}
                      rules={{ required: "Nature of property is required" }}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select nature of property" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="placeOfResidence">
                              Place of Residence
                            </SelectItem>
                            <SelectItem value="extraResidential">
                              Extra Residential
                            </SelectItem>
                            <SelectItem value="commercial">
                              Commercial
                            </SelectItem>
                            <SelectItem value="agricultural">
                              Agricultural
                            </SelectItem>
                            <SelectItem value="plot">Plot</SelectItem>
                            <SelectItem value="others">Others</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.realEstate?.[index]?.nature && (
                      <span className="text-red-500">
                        {errors.realEstate[index]?.nature?.message}
                      </span>
                    )}

                    <Input
                      {...register(`realEstate.${index}.location` as const, {
                        required: "Location is required",
                      })}
                      placeholder="Location"
                    />
                    {errors.realEstate?.[index]?.location && (
                      <span className="text-red-500">
                        {errors.realEstate[index]?.location?.message}
                      </span>
                    )}

                    <Input
                      {...register(`realEstate.${index}.area` as const, {
                        setValueAs: (v) => (v === "" ? null : parseFloat(v)),
                        min: {
                          value: 0,
                          message: "Area must be a positive number",
                        },
                      })}
                      placeholder="Area (in sq. ft.)"
                      type="number"
                    />
                    {errors.realEstate?.[index]?.area && (
                      <span className="text-red-500">
                        {errors.realEstate[index]?.area?.message}
                      </span>
                    )}

                    <Input
                      {...register(
                        `realEstate.${index}.purchaseValue` as const,
                        {
                          setValueAs: (v) => (v === "" ? null : parseFloat(v)),
                          min: {
                            value: 0,
                            message: "Purchase value must be a positive number",
                          },
                        },
                      )}
                      placeholder="Purchase Value"
                      type="number"
                    />
                    {errors.realEstate?.[index]?.purchaseValue && (
                      <span className="text-red-500">
                        {errors.realEstate[index]?.purchaseValue?.message}
                      </span>
                    )}

                    <Input
                      {...register(
                        `realEstate.${index}.currentValue` as const,
                        {
                          setValueAs: (v) => (v === "" ? null : parseFloat(v)),
                          min: {
                            value: 0,
                            message: "Current value must be a positive number",
                          },
                        },
                      )}
                      placeholder="Current Value"
                      type="number"
                    />
                    {errors.realEstate?.[index]?.currentValue && (
                      <span className="text-red-500">
                        {errors.realEstate[index]?.currentValue?.message}
                      </span>
                    )}

                    <Button
                      type="button"
                      onClick={() => remove(index)}
                      variant="destructive"
                    >
                      Remove Property
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() =>
                    append({
                      nature: "",
                      location: "",
                      area: null,
                      purchaseValue: null,
                      currentValue: null,
                    })
                  }
                >
                  Add Real Estate Property
                </Button>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="reits">
              <AccordionTrigger>REITs</AccordionTrigger>
              <AccordionContent>
                <Label htmlFor="reits-current-value">Current Value</Label>
                <Input
                  id="reits-current-value"
                  {...register("reits.currentValue", {
                    setValueAs: (v) => (v === "" ? null : parseFloat(v)),
                    min: {
                      value: 0,
                      message: "Current value must be a positive number",
                    },
                  })}
                  placeholder="Current Value"
                  type="number"
                />
                {errors.reits?.currentValue && (
                  <span className="text-red-500">
                    {errors.reits.currentValue.message}
                  </span>
                )}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="gold-jewellery">
              <AccordionTrigger>Gold & Jewellery</AccordionTrigger>
              <AccordionContent>
                <Label htmlFor="gold-jewellery-current-value">
                  Current Value
                </Label>
                <Input
                  id="gold-jewellery-current-value"
                  {...register("goldJewellery.currentValue", {
                    setValueAs: (v) => (v === "" ? null : parseFloat(v)),
                    min: {
                      value: 0,
                      message: "Current value must be a positive number",
                    },
                  })}
                  placeholder="Current Value"
                  type="number"
                />
                {errors.goldJewellery?.currentValue && (
                  <span className="text-red-500">
                    {errors.goldJewellery.currentValue.message}
                  </span>
                )}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="chit-funds">
              <AccordionTrigger>Chit Funds</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Label htmlFor="chit-funds-monthly-contribution">
                    Monthly Contribution
                  </Label>
                  <Input
                    id="chit-funds-monthly-contribution"
                    {...register("chitFunds.monthlyContribution", {
                      setValueAs: (v) => (v === "" ? null : parseFloat(v)),
                      min: {
                        value: 0,
                        message:
                          "Monthly contribution must be a positive number",
                      },
                    })}
                    placeholder="Monthly Contribution"
                    type="number"
                  />
                  {errors.chitFunds?.monthlyContribution && (
                    <span className="text-red-500">
                      {errors.chitFunds.monthlyContribution.message}
                    </span>
                  )}

                  <Label htmlFor="chit-funds-tenure">Tenure</Label>
                  <Input
                    id="chit-funds-tenure"
                    {...register("chitFunds.tenure")}
                    placeholder="Tenure"
                  />

                  <Label htmlFor="chit-funds-chit-value">Chit Value</Label>
                  <Input
                    id="chit-funds-chit-value"
                    {...register("chitFunds.chitValue", {
                      setValueAs: (v) => (v === "" ? null : parseFloat(v)),
                      min: {
                        value: 0,
                        message: "Chit value must be a positive number",
                      },
                    })}
                    placeholder="Chit Value"
                    type="number"
                  />
                  {errors.chitFunds?.chitValue && (
                    <span className="text-red-500">
                      {errors.chitFunds.chitValue.message}
                    </span>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="listed-equity">
              <AccordionTrigger>Listed Equity</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Label htmlFor="listed-equity-purchase-value">
                    Purchase Value
                  </Label>
                  <Input
                    id="listed-equity-purchase-value"
                    {...register("listedEquity.purchaseValue", {
                      setValueAs: (v) => (v === "" ? null : parseFloat(v)),
                      min: {
                        value: 0,
                        message: "Purchase value must be a positive number",
                      },
                    })}
                    placeholder="Purchase Value"
                    type="number"
                  />
                  {errors.listedEquity?.purchaseValue && (
                    <span className="text-red-500">
                      {errors.listedEquity.purchaseValue.message}
                    </span>
                  )}

                  <Label htmlFor="listed-equity-current-value">
                    Current Value
                  </Label>
                  <Input
                    id="listed-equity-current-value"
                    {...register("listedEquity.currentValue", {
                      setValueAs: (v) => (v === "" ? null : parseFloat(v)),
                      min: {
                        value: 0,
                        message: "Current value must be a positive number",
                      },
                    })}
                    placeholder="Current Value"
                    type="number"
                  />
                  {errors.listedEquity?.currentValue && (
                    <span className="text-red-500">
                      {errors.listedEquity.currentValue.message}
                    </span>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="mutual-funds">
              <AccordionTrigger>Mutual Funds</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Label htmlFor="mutual-funds-purchase-value">
                    Purchase Value
                  </Label>
                  <Input
                    id="mutual-funds-purchase-value"
                    {...register("mutualFunds.purchaseValue", {
                      setValueAs: (v) => (v === "" ? null : parseFloat(v)),
                      min: {
                        value: 0,
                        message: "Purchase value must be a positive number",
                      },
                    })}
                    placeholder="Purchase Value"
                    type="number"
                  />
                  {errors.mutualFunds?.purchaseValue && (
                    <span className="text-red-500">
                      {errors.mutualFunds.purchaseValue.message}
                    </span>
                  )}

                  <Label htmlFor="mutual-funds-current-value">
                    Current Value
                  </Label>
                  <Input
                    id="mutual-funds-current-value"
                    {...register("mutualFunds.currentValue", {
                      setValueAs: (v) => (v === "" ? null : parseFloat(v)),
                      min: {
                        value: 0,
                        message: "Current value must be a positive number",
                      },
                    })}
                    placeholder="Current Value"
                    type="number"
                  />
                  {errors.mutualFunds?.currentValue && (
                    <span className="text-red-500">
                      {errors.mutualFunds.currentValue.message}
                    </span>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="fixed-deposit">
              <AccordionTrigger>Fixed Deposit</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Label htmlFor="fixed-deposit-purchase-value">
                    Purchase Value
                  </Label>
                  <Input
                    id="fixed-deposit-purchase-value"
                    {...register("fixedDeposit.purchaseValue", {
                      setValueAs: (v) => (v === "" ? null : parseFloat(v)),
                      min: {
                        value: 0,
                        message: "Purchase value must be a positive number",
                      },
                    })}
                    placeholder="Purchase Value"
                    type="number"
                  />
                  {errors.fixedDeposit?.purchaseValue && (
                    <span className="text-red-500">
                      {errors.fixedDeposit.purchaseValue.message}
                    </span>
                  )}

                  <Label htmlFor="fixed-deposit-current-value">
                    Current Value
                  </Label>
                  <Input
                    id="fixed-deposit-current-value"
                    {...register("fixedDeposit.currentValue", {
                      setValueAs: (v) => (v === "" ? null : parseFloat(v)),
                      min: {
                        value: 0,
                        message: "Current value must be a positive number",
                      },
                    })}
                    placeholder="Current Value"
                    type="number"
                  />
                  {errors.fixedDeposit?.currentValue && (
                    <span className="text-red-500">
                      {errors.fixedDeposit.currentValue.message}
                    </span>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="eps">
              <AccordionTrigger>EPS</AccordionTrigger>
              <AccordionContent>
                <Label htmlFor="eps-current-value">Current Value</Label>
                <Input
                  id="eps-current-value"
                  {...register("eps.currentValue", {
                    setValueAs: (v) => (v === "" ? null : parseFloat(v)),
                    min: {
                      value: 0,
                      message: "Current value must be a positive number",
                    },
                  })}
                  placeholder="Current Value"
                  type="number"
                />
                {errors.eps?.currentValue && (
                  <span className="text-red-500">
                    {errors.eps.currentValue.message}
                  </span>
                )}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="nps">
              <AccordionTrigger>NPS</AccordionTrigger>
              <AccordionContent>
                <Label htmlFor="nps-current-value">Current Value</Label>
                <Input
                  id="nps-current-value"
                  {...register("nps.currentValue", {
                    setValueAs: (v) => (v === "" ? null : parseFloat(v)),
                    min: {
                      value: 0,
                      message: "Current value must be a positive number",
                    },
                  })}
                  placeholder="Current Value"
                  type="number"
                />
                {errors.nps?.currentValue && (
                  <span className="text-red-500">
                    {errors.nps.currentValue.message}
                  </span>
                )}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="ulip">
              <AccordionTrigger>ULIP</AccordionTrigger>
              <AccordionContent>
                <Label htmlFor="ulip-current-value">Current Value</Label>
                <Input
                  id="ulip-current-value"
                  {...register("ulip.currentValue", {
                    setValueAs: (v) => (v === "" ? null : parseFloat(v)),
                    min: {
                      value: 0,
                      message: "Current value must be a positive number",
                    },
                  })}
                  placeholder="Current Value"
                  type="number"
                />
                {errors.ulip?.currentValue && (
                  <span className="text-red-500">
                    {errors.ulip.currentValue.message}
                  </span>
                )}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="bonds-debentures">
              <AccordionTrigger>Bonds & Debentures</AccordionTrigger>
              <AccordionContent>
                <Label htmlFor="bonds-debentures-current-value">
                  Current Value
                </Label>
                <Input
                  id="bonds-debentures-current-value"
                  {...register("bondsDebentures.currentValue", {
                    setValueAs: (v) => (v === "" ? null : parseFloat(v)),
                    min: {
                      value: 0,
                      message: "Current value must be a positive number",
                    },
                  })}
                  placeholder="Current Value"
                  type="number"
                />
                {errors.bondsDebentures?.currentValue && (
                  <span className="text-red-500">
                    {errors.bondsDebentures.currentValue.message}
                  </span>
                )}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="alternative-investments">
              <AccordionTrigger>Alternative Investments</AccordionTrigger>
              <AccordionContent>
                <Label htmlFor="alternative-investments-current-value">
                  Current Value
                </Label>
                <Input
                  id="alternative-investments-current-value"
                  {...register("alternativeInvestments.currentValue", {
                    setValueAs: (v) => (v === "" ? null : parseFloat(v)),
                    min: {
                      value: 0,
                      message: "Current value must be a positive number",
                    },
                  })}
                  placeholder="Current Value"
                  type="number"
                />
                {errors.alternativeInvestments?.currentValue && (
                  <span className="text-red-500">
                    {errors.alternativeInvestments.currentValue.message}
                  </span>
                )}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="unsecured-lending">
              <AccordionTrigger>Unsecured Lending</AccordionTrigger>
              <AccordionContent>
                <Label htmlFor="unsecured-lending-current-value">
                  Current Value
                </Label>
                <Input
                  id="unsecured-lending-current-value"
                  {...register("unsecuredLending.currentValue", {
                    setValueAs: (v) => (v === "" ? null : parseFloat(v)),
                    min: {
                      value: 0,
                      message: "Current value must be a positive number",
                    },
                  })}
                  placeholder="Current Value"
                  type="number"
                />
                {errors.unsecuredLending?.currentValue && (
                  <span className="text-red-500">
                    {errors.unsecuredLending.currentValue.message}
                  </span>
                )}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="private-equity">
              <AccordionTrigger>Private Equity</AccordionTrigger>
              <AccordionContent>
                <Label htmlFor="private-equity-current-value">
                  Current Value
                </Label>
                <Input
                  id="private-equity-current-value"
                  {...register("privateEquity.currentValue", {
                    setValueAs: (v) => (v === "" ? null : parseFloat(v)),
                    min: {
                      value: 0,
                      message: "Current value must be a positive number",
                    },
                  })}
                  placeholder="Current Value"
                  type="number"
                />
                {errors.privateEquity?.currentValue && (
                  <span className="text-red-500">
                    {errors.privateEquity.currentValue.message}
                  </span>
                )}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="postal-savings">
              <AccordionTrigger>Postal Savings</AccordionTrigger>
              <AccordionContent>
                <Label htmlFor="postal-savings-current-value">
                  Current Value
                </Label>
                <Input
                  id="postal-savings-current-value"
                  {...register("postalSavings.currentValue", {
                    setValueAs: (v) => (v === "" ? null : parseFloat(v)),
                    min: {
                      value: 0,
                      message: "Current value must be a positive number",
                    },
                  })}
                  placeholder="Current Value"
                  type="number"
                />
                {errors.postalSavings?.currentValue && (
                  <span className="text-red-500">
                    {errors.postalSavings.currentValue.message}
                  </span>
                )}
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cash-equivalents">
              <AccordionTrigger>Cash Equivalents</AccordionTrigger>
              <AccordionContent>
                <Label htmlFor="cash-equivalents-current-value">
                  Current Value
                </Label>
                <Input
                  id="cash-equivalents-current-value"
                  {...register("cashEquivalents.currentValue", {
                    setValueAs: (v) => (v === "" ? null : parseFloat(v)),
                    min: {
                      value: 0,
                      message: "Current value must be a positive number",
                    },
                  })}
                  placeholder="Current Value"
                  type="number"
                />
                {errors.cashEquivalents?.currentValue && (
                  <span className="text-red-500">
                    {errors.cashEquivalents.currentValue.message}
                  </span>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button type="button" onClick={onPrevious} variant="outline">
          Previous
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Next"}
        </Button>
      </div>
    </form>
  );
}

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
    area: number;
    purchaseValue: number;
    currentValue: number;
  }>;
  reits: { currentValue: number };
  goldJewellery: { currentValue: number };
  chitFunds: {
    monthlyContribution: number;
    tenure: string;
    chitValue: number;
  };
  listedEquity: {
    purchaseValue: number;
    currentValue: number;
  };
  mutualFunds: {
    purchaseValue: number;
    currentValue: number;
  };
  fixedDeposit: {
    purchaseValue: number;
    currentValue: number;
  };
  eps: { currentValue: number };
  nps: { currentValue: number };
  ulip: { currentValue: number };
  bondsDebentures: { currentValue: number };
  alternativeInvestments: { currentValue: number };
  unsecuredLending: { currentValue: number };
  privateEquity: { currentValue: number };
  postalSavings: { currentValue: number };
  cashEquivalents: { currentValue: number };
}

interface AssetAnalysisProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
  initialData?: any;
}

export default function AssetAnalysis({
  onSubmit,
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
      reits: { currentValue: 0 },
      goldJewellery: { currentValue: 0 },
      chitFunds: { monthlyContribution: 0, tenure: "", chitValue: 0 },
      listedEquity: { purchaseValue: 0, currentValue: 0 },
      mutualFunds: { purchaseValue: 0, currentValue: 0 },
      fixedDeposit: { purchaseValue: 0, currentValue: 0 },
      eps: { currentValue: 0 },
      nps: { currentValue: 0 },
      ulip: { currentValue: 0 },
      bondsDebentures: { currentValue: 0 },
      alternativeInvestments: { currentValue: 0 },
      unsecuredLending: { currentValue: 0 },
      privateEquity: { currentValue: 0 },
      postalSavings: { currentValue: 0 },
      cashEquivalents: { currentValue: 0 },
    },
  });
  const {
    fields: realEstateFields,
    append: appendRealEstate,
    remove: removeRealEstate,
  } = useFieldArray({
    control,
    name: "realEstate",
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 w-full max-w-2xl"
    >
      <Card>
        <CardHeader>
          <CardTitle>Asset Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="realEstate">
              <AccordionTrigger>Real Estate</AccordionTrigger>
              <AccordionContent>
                {realEstateFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="space-y-4 p-4 border rounded mb-4"
                  >
                    <Controller
                      name={`realEstate.${index}.nature`}
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
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
                        This field is required
                      </span>
                    )}

                    <Input
                      {...register(`realEstate.${index}.location`, {
                        required: true,
                      })}
                      placeholder="Location"
                    />
                    {errors.realEstate?.[index]?.location && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}

                    <Input
                      {...register(`realEstate.${index}.area`, {
                        required: true,
                        min: 0,
                      })}
                      placeholder="Area (sq.ft)"
                      type="number"
                    />
                    {errors.realEstate?.[index]?.area && (
                      <span className="text-red-500">
                        This field is required and must be a positive number
                      </span>
                    )}

                    <Input
                      {...register(`realEstate.${index}.purchaseValue`, {
                        required: true,
                        min: 0,
                      })}
                      placeholder="Purchase Value"
                      type="number"
                    />
                    {errors.realEstate?.[index]?.purchaseValue && (
                      <span className="text-red-500">
                        This field is required and must be a positive number
                      </span>
                    )}

                    <Input
                      {...register(`realEstate.${index}.currentValue`, {
                        required: true,
                        min: 0,
                      })}
                      placeholder="Current Value"
                      type="number"
                    />
                    {errors.realEstate?.[index]?.currentValue && (
                      <span className="text-red-500">
                        This field is required and must be a positive number
                      </span>
                    )}

                    <Button
                      type="button"
                      onClick={() => removeRealEstate(index)}
                      variant="destructive"
                    >
                      Remove Property
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={() =>
                    appendRealEstate({
                      nature: "",
                      location: "",
                      area: 0,
                      purchaseValue: 0,
                      currentValue: 0,
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
                <div className="space-y-4">
                  <Label htmlFor="reits.currentValue">Current Value</Label>
                  <Input
                    {...register("reits.currentValue", {
                      required: true,
                      min: 0,
                    })}
                    type="number"
                    id="reits.currentValue"
                  />
                  {errors.reits?.currentValue && (
                    <span className="text-red-500">
                      This field is required and must be a positive number
                    </span>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="goldJewellery">
              <AccordionTrigger>Gold/Jewellery</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Label htmlFor="goldJewellery.currentValue">
                    Current Value
                  </Label>
                  <Input
                    {...register("goldJewellery.currentValue", {
                      required: true,
                      min: 0,
                    })}
                    type="number"
                    id="goldJewellery.currentValue"
                  />
                  {errors.goldJewellery?.currentValue && (
                    <span className="text-red-500">
                      This field is required and must be a positive number
                    </span>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="chitFunds">
              <AccordionTrigger>Chit Funds</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Label htmlFor="chitFunds.monthlyContribution">
                    Monthly Contribution
                  </Label>
                  <Input
                    {...register("chitFunds.monthlyContribution", {
                      required: true,
                      min: 0,
                    })}
                    type="number"
                    id="chitFunds.monthlyContribution"
                  />
                  {errors.chitFunds?.monthlyContribution && (
                    <span className="text-red-500">
                      This field is required and must be a positive number
                    </span>
                  )}

                  <Label htmlFor="chitFunds.tenure">Tenure</Label>
                  <Input
                    {...register("chitFunds.tenure", { required: true })}
                    id="chitFunds.tenure"
                  />
                  {errors.chitFunds?.tenure && (
                    <span className="text-red-500">This field is required</span>
                  )}

                  <Label htmlFor="chitFunds.chitValue">Chit Value</Label>
                  <Input
                    {...register("chitFunds.chitValue", {
                      required: true,
                      min: 0,
                    })}
                    type="number"
                    id="chitFunds.chitValue"
                  />
                  {errors.chitFunds?.chitValue && (
                    <span className="text-red-500">
                      This field is required and must be a positive number
                    </span>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="listedEquity">
              <AccordionTrigger>Listed Equity</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Label htmlFor="listedEquity.purchaseValue">
                    Purchase Value
                  </Label>
                  <Input
                    {...register("listedEquity.purchaseValue", {
                      required: true,
                      min: 0,
                    })}
                    type="number"
                    id="listedEquity.purchaseValue"
                  />
                  {errors.listedEquity?.purchaseValue && (
                    <span className="text-red-500">
                      This field is required and must be a positive number
                    </span>
                  )}

                  <Label htmlFor="listedEquity.currentValue">
                    Current Value
                  </Label>
                  <Input
                    {...register("listedEquity.currentValue", {
                      required: true,
                      min: 0,
                    })}
                    type="number"
                    id="listedEquity.currentValue"
                  />
                  {errors.listedEquity?.currentValue && (
                    <span className="text-red-500">
                      This field is required and must be a positive number
                    </span>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="mutualFunds">
              <AccordionTrigger>Mutual Funds</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Label htmlFor="mutualFunds.purchaseValue">
                    Purchase Value
                  </Label>
                  <Input
                    {...register("mutualFunds.purchaseValue", {
                      required: true,
                      min: 0,
                    })}
                    type="number"
                    id="mutualFunds.purchaseValue"
                  />
                  {errors.mutualFunds?.purchaseValue && (
                    <span className="text-red-500">
                      This field is required and must be a positive number
                    </span>
                  )}

                  <Label htmlFor="mutualFunds.currentValue">
                    Current Value
                  </Label>
                  <Input
                    {...register("mutualFunds.currentValue", {
                      required: true,
                      min: 0,
                    })}
                    type="number"
                    id="mutualFunds.currentValue"
                  />
                  {errors.mutualFunds?.currentValue && (
                    <span className="text-red-500">
                      This field is required and must be a positive number
                    </span>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="fixedDeposit">
              <AccordionTrigger>Fixed Deposit</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Label htmlFor="fixedDeposit.purchaseValue">
                    Purchase Value
                  </Label>
                  <Input
                    {...register("fixedDeposit.purchaseValue", {
                      required: true,
                      min: 0,
                    })}
                    type="number"
                    id="fixedDeposit.purchaseValue"
                  />
                  {errors.fixedDeposit?.purchaseValue && (
                    <span className="text-red-500">
                      This field is required and must be a positive number
                    </span>
                  )}

                  <Label htmlFor="fixedDeposit.currentValue">
                    Current Value
                  </Label>
                  <Input
                    {...register("fixedDeposit.currentValue", {
                      required: true,
                      min: 0,
                    })}
                    type="number"
                    id="fixedDeposit.currentValue"
                  />
                  {errors.fixedDeposit?.currentValue && (
                    <span className="text-red-500">
                      This field is required and must be a positive number
                    </span>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="eps">
              <AccordionTrigger>EPS</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Label htmlFor="eps.currentValue">Current Value</Label>
                  <Input
                    {...register("eps.currentValue", {
                      required: true,
                      min: 0,
                    })}
                    type="number"
                    id="eps.currentValue"
                  />
                  {errors.eps?.currentValue && (
                    <span className="text-red-500">
                      This field is required and must be a positive number
                    </span>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="nps">
              <AccordionTrigger>NPS</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Label htmlFor="nps.currentValue">Current Value</Label>
                  <Input
                    {...register("nps.currentValue", {
                      required: true,
                      min: 0,
                    })}
                    type="number"
                    id="nps.currentValue"
                  />
                  {errors.nps?.currentValue && (
                    <span className="text-red-500">
                      This field is required and must be a positive number
                    </span>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="ulip">
              <AccordionTrigger>ULIP</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Label htmlFor="ulip.currentValue">Current Value</Label>
                  <Input
                    {...register("ulip.currentValue", {
                      required: true,
                      min: 0,
                    })}
                    type="number"
                    id="ulip.currentValue"
                  />
                  {errors.ulip?.currentValue && (
                    <span className="text-red-500">
                      This field is required and must be a positive number
                    </span>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="bondsDebentures">
              <AccordionTrigger>Bonds/Debentures</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Label htmlFor="bondsDebentures.currentValue">
                    Current Value
                  </Label>
                  <Input
                    {...register("bondsDebentures.currentValue", {
                      required: true,
                      min: 0,
                    })}
                    type="number"
                    id="bondsDebentures.currentValue"
                  />
                  {errors.bondsDebentures?.currentValue && (
                    <span className="text-red-500">
                      This field is required and must be a positive number
                    </span>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="alternativeInvestments">
              <AccordionTrigger>Alternative Investments</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Label htmlFor="alternativeInvestments.currentValue">
                    Current Value
                  </Label>
                  <Input
                    {...register("alternativeInvestments.currentValue", {
                      required: true,
                      min: 0,
                    })}
                    type="number"
                    id="alternativeInvestments.currentValue"
                  />
                  {errors.alternativeInvestments?.currentValue && (
                    <span className="text-red-500">
                      This field is required and must be a positive number
                    </span>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="unsecuredLending">
              <AccordionTrigger>Unsecured Lending</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Label htmlFor="unsecuredLending.currentValue">
                    Current Value
                  </Label>
                  <Input
                    {...register("unsecuredLending.currentValue", {
                      required: true,
                      min: 0,
                    })}
                    type="number"
                    id="unsecuredLending.currentValue"
                  />
                  {errors.unsecuredLending?.currentValue && (
                    <span className="text-red-500">
                      This field is required and must be a positive number
                    </span>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="privateEquity">
              <AccordionTrigger>Private Equity</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Label htmlFor="privateEquity.currentValue">
                    Current Value
                  </Label>
                  <Input
                    {...register("privateEquity.currentValue", {
                      required: true,
                      min: 0,
                    })}
                    type="number"
                    id="privateEquity.currentValue"
                  />
                  {errors.privateEquity?.currentValue && (
                    <span className="text-red-500">
                      This field is required and must be a positive number
                    </span>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="postalSavings">
              <AccordionTrigger>Postal Savings</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Label htmlFor="postalSavings.currentValue">
                    Current Value
                  </Label>
                  <Input
                    {...register("postalSavings.currentValue", {
                      required: true,
                      min: 0,
                    })}
                    type="number"
                    id="postalSavings.currentValue"
                  />
                  {errors.postalSavings?.currentValue && (
                    <span className="text-red-500">
                      This field is required and must be a positive number
                    </span>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="cashEquivalents">
              <AccordionTrigger>Cash Equivalents</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4">
                  <Label htmlFor="cashEquivalents.currentValue">
                    Current Value
                  </Label>
                  <Input
                    {...register("cashEquivalents.currentValue", {
                      required: true,
                      min: 0,
                    })}
                    type="number"
                    id="cashEquivalents.currentValue"
                  />
                  {errors.cashEquivalents?.currentValue && (
                    <span className="text-red-500">
                      This field is required and must be a positive number
                    </span>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Saving..." : "Save and Continue"}
      </Button>
    </form>
  );
}

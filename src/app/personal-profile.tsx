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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PersonalProfileFormData {
  mobileNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  age: "<25" | "25-35" | "35-45" | "45-60" | ">60";
  address: string;
  pinCode: string;
  city: string;
  state: string;
  country: string;
  panNumber: string;
  citizenship: string;
  gender: "male" | "female" | "other";
  occupation:
    | "selfEmployed"
    | "business"
    | "governmentEmployee"
    | "privateEmployee"
    | "student"
    | "retired"
    | "niksenPractitioner";
  preferredLanguage:
    | "english"
    | "hindi"
    | "telugu"
    | "tamil"
    | "marathi"
    | "kannada"
    | "other";
  maritalStatus: "single" | "married" | "preferNotToShare";
}

interface PersonalProfileProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
  initialData?: any;
}

export default function PersonalProfile({
  onSubmit,
  isLoading,
  initialData,
}: PersonalProfileProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PersonalProfileFormData>({
    defaultValues: initialData,
  });

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Personal Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mobileNumber">Mobile Number</Label>
              <Input
                id="mobileNumber"
                {...register("mobileNumber", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Please enter a valid 10-digit mobile number",
                  },
                })}
              />
              {errors.mobileNumber && (
                <span className="text-red-500 text-sm">
                  {errors.mobileNumber.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email ID</Label>
              <Input
                id="email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Please enter a valid email address",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                {...register("firstName", {
                  required: "First name is required",
                })}
              />
              {errors.firstName && (
                <span className="text-red-500 text-sm">
                  {errors.firstName.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                {...register("lastName", { required: "Last name is required" })}
              />
              {errors.lastName && (
                <span className="text-red-500 text-sm">
                  {errors.lastName.message}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Controller
              name="age"
              control={control}
              rules={{ required: "Age is required" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger id="age">
                    <SelectValue placeholder="Select age range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="<25">&lt;25</SelectItem>
                    <SelectItem value="25-35">25 - 35</SelectItem>
                    <SelectItem value="35-45">35 - 45</SelectItem>
                    <SelectItem value="45-60">45 - 60</SelectItem>
                    <SelectItem value=">60">&gt;60</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.age && (
              <span className="text-red-500 text-sm">{errors.age.message}</span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              {...register("address", { required: "Address is required" })}
            />
            {errors.address && (
              <span className="text-red-500 text-sm">
                {errors.address.message}
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pinCode">PIN Code</Label>
              <Input
                id="pinCode"
                {...register("pinCode", {
                  required: "PIN code is required",
                  pattern: {
                    value: /^[0-9]{6}$/,
                    message: "Please enter a valid 6-digit PIN code",
                  },
                })}
              />
              {errors.pinCode && (
                <span className="text-red-500 text-sm">
                  {errors.pinCode.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                {...register("city", { required: "City is required" })}
              />
              {errors.city && (
                <span className="text-red-500 text-sm">
                  {errors.city.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                {...register("state", { required: "State is required" })}
              />
              {errors.state && (
                <span className="text-red-500 text-sm">
                  {errors.state.message}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                {...register("country", { required: "Country is required" })}
              />
              {errors.country && (
                <span className="text-red-500 text-sm">
                  {errors.country.message}
                </span>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="panNumber">PAN Card Number</Label>
            <Input
              id="panNumber"
              {...register("panNumber", {
                required: "PAN number is required",
                pattern: {
                  value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                  message: "Please enter a valid PAN number",
                },
              })}
            />
            {errors.panNumber && (
              <span className="text-red-500 text-sm">
                {errors.panNumber.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="citizenship">Citizenship</Label>
            <Input
              id="citizenship"
              {...register("citizenship", {
                required: "Citizenship is required",
              })}
            />
            {errors.citizenship && (
              <span className="text-red-500 text-sm">
                {errors.citizenship.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Controller
              name="gender"
              control={control}
              rules={{ required: "Gender is required" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger id="gender">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.gender && (
              <span className="text-red-500 text-sm">
                {errors.gender.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="occupation">Occupation</Label>
            <Controller
              name="occupation"
              control={control}
              rules={{ required: "Occupation is required" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger id="occupation">
                    <SelectValue placeholder="Select occupation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="selfEmployed">Self-Employed</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="governmentEmployee">
                      Government Employee
                    </SelectItem>
                    <SelectItem value="privateEmployee">
                      Private Employee
                    </SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                    <SelectItem value="niksenPractitioner">
                      Niksen Practitioner
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.occupation && (
              <span className="text-red-500 text-sm">
                {errors.occupation.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferredLanguage">
              Preferred Language to Communicate with Savart
            </Label>
            <Controller
              name="preferredLanguage"
              control={control}
              rules={{ required: "Preferred language is required" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger id="preferredLanguage">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="hindi">Hindi</SelectItem>
                    <SelectItem value="telugu">Telugu</SelectItem>
                    <SelectItem value="tamil">Tamil</SelectItem>
                    <SelectItem value="marathi">Marathi</SelectItem>
                    <SelectItem value="kannada">Kannada</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.preferredLanguage && (
              <span className="text-red-500 text-sm">
                {errors.preferredLanguage.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="maritalStatus">What is your Marital Status?</Label>
            <Controller
              name="maritalStatus"
              control={control}
              rules={{ required: "Marital status is required" }}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger id="maritalStatus">
                    <SelectValue placeholder="Select marital status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="preferNotToShare">
                      Prefer not to share
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.maritalStatus && (
              <span className="text-red-500 text-sm">
                {errors.maritalStatus.message}
              </span>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Saving..." : "Save and Continue"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FloppyDisk, PersonPlus } from "@gravity-ui/icons";
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";

const highlights = [
  { label: "Setup time", value: "2 min" },
  { label: "Required fields", value: "3" },
  { label: "Profile ready", value: "Instant" },
];

const NewUserPage = () => {
  const router = useRouter();

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const newUser = Object.fromEntries(formData.entries());

    console.log("New user data:", newUser);

    const req = await fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    const res = await req.json();
    if (res.success) {
      alert("User created successfully!");
      router.push("/users");
    }
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.16),_transparent_32%),linear-gradient(180deg,_#f8fafc_0%,_#e2e8f0_100%)] px-4 py-10 font-sans sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 lg:flex-row">
        <section className="flex-1 rounded-[2rem] border border-white/70 bg-slate-950 px-6 py-8 text-slate-50 shadow-[0_30px_80px_rgba(15,23,42,0.35)] sm:px-8 lg:px-10">
          <div className="flex max-w-xl flex-col gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-sky-100 backdrop-blur">
              <PersonPlus className="size-4" />
              Create a polished user profile
            </div>

            <div className="space-y-4">
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-300/80">
                User Management
              </p>
              <h1 className="max-w-lg text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Add a new teammate with a cleaner, more confident flow.
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
                Fill in the essentials once and keep the onboarding experience
                simple. The layout is designed to make the form feel less flat
                and easier to scan.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/8 px-4 py-4 backdrop-blur-sm"
                >
                  <p className="text-2xl font-semibold text-white">
                    {item.value}
                  </p>
                  <p className="mt-1 text-sm text-slate-300">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-sky-400/20 bg-sky-400/10 p-5 text-sm leading-7 text-sky-50">
              Keep names clear, emails valid, and bios descriptive so the
              profile feels complete from day one.
            </div>
          </div>
        </section>

        <section className="w-full max-w-2xl rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-[0_25px_70px_rgba(148,163,184,0.28)] backdrop-blur sm:p-8">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-sky-700">
                New User
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                Profile Details
              </h2>
              <p className="max-w-lg text-sm leading-6 text-slate-600">
                Enter the basic information below to create a fresh user
                profile.
              </p>
            </div>
            <Link
              href="/users"
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
            >
              Back to users
            </Link>
          </div>

          <Form className="w-full" onSubmit={onSubmit}>
            <Fieldset className="gap-6">
              <Fieldset.Legend className="text-lg font-semibold text-slate-900">
                Personal Information
              </Fieldset.Legend>
              <Description className="text-sm text-slate-500">
                These details will appear on the user profile and directory.
              </Description>

              <FieldGroup className="gap-5">
                <TextField
                  isRequired
                  name="name"
                  validate={(value) => {
                    if (value.length < 3) {
                      return "Name must be at least 3 characters";
                    }
                    return null;
                  }}
                >
                  <Label className="text-sm font-medium text-slate-700">
                    Full name
                  </Label>
                  <Input
                    className="mt-2"
                    placeholder="Write Your Name"
                    size="lg"
                  />
                  <FieldError />
                </TextField>

                <TextField isRequired name="email" type="email">
                  <Label className="text-sm font-medium text-slate-700">
                    Work email
                  </Label>
                  <Input
                    className="mt-2"
                    placeholder="Write your email"
                    size="lg"
                  />
                  <FieldError />
                </TextField>
              </FieldGroup>

              <Fieldset.Actions className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  className="h-12 rounded-full bg-slate-950 px-6 text-white"
                  type="submit"
                >
                  <FloppyDisk />
                  Save user
                </Button>
                <Link
                  href="/users"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 px-6 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950"
                >
                  Cancel
                </Link>
              </Fieldset.Actions>
            </Fieldset>
          </Form>
        </section>
      </div>
    </main>
  );
};

export default NewUserPage;

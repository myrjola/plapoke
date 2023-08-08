"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { createPlanningSession } from "#/app/actions";

export default function Page() {
  const { pending } = useFormStatus();

  return (
    <form
      action={createPlanningSession}
      className="grid place-content-center h-full"
    >
      <div className="space-y-12 w-full max-w-sm">
        <h1 className="text-base font-semibold leading-7 text-gray-900">
          Create planning poker session
        </h1>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          When you create a session, you'll get a link that you can share with
          your team.
        </p>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Your name
          </label>
          <div className="mt-2">
            <input
              name="name"
              id="name"
              autoComplete="given-name"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end">
          <button
            type="submit"
            disabled={pending}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {pending ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </form>
  );
}

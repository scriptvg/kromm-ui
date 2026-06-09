import { Button } from "@/components/ui/button"
import { Banner } from "@/registry/kromm-ui/ui/banner"

export default function Page() {
  return (
    <div className="flex flex-col min-h-svh">
      <Banner showClose>

      </Banner>
      <div className="flex max-w-md min-w-0 flex-col p-6 gap-4 text-sm leading-loose">
        <div>
          <h1 className="font-medium">Project ready!</h1>
          <p>You may now add components and start building.</p>
          <p>We&apos;ve already added the button component for you.</p>
          <Button className="mt-2">Button</Button>
        </div>
        <div className="font-mono text-xs text-muted-foreground">
          (Press <kbd>d</kbd> to toggle dark mode)
        </div>
      </div>
    </div>
  )
}

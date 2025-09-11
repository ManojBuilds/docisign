// Example usage of the SupportModal component
import { SupportModal } from '@/components/support'

export default function SupportModalExample() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold">Support Modal Example</h1>
      <p className="text-muted-foreground">Click the button below to open the support modal</p>
      <p className="text-sm text-muted-foreground text-center max-w-md">
        This component is integrated with HeySheet API for handling support requests.
        Submitted data will be sent to: https://app.heysheet.in/api/s/Zo0HVTIDk6
      </p>
      <SupportModal />
    </div>
  )
}
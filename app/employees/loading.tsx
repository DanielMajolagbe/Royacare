import LoadingSpinner from "@/components/ui/LoadingSpinner"

export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80">
      <LoadingSpinner />
    </div>
  )
}

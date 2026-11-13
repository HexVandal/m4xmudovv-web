export default function Logo({ size = 32 }) {
  return (
    <span className="inline-flex items-center gap-2.5 font-semibold tracking-tight">
      <img src="/logo.webp" width={size} height={size} alt="" className="rounded-[22%]" />
      <span>m4xmudovv</span>
    </span>
  )
}

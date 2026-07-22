export default function ({ postsPerPage }: { postsPerPage: number }) {
	return (
		<>
			{/* post-preview-large */}
			<div className="grid animate-pulse items-center gap-4 md:order-first md:grid-cols-2">
				<div className="skeleton max-md:full-bleed aspect-video h-auto w-full" />

				<div className="grid gap-2 self-center">
					<div className="skeleton h1 h-[2lh]" />

					<div className="h-[2lh]"></div>

					<div className="flex flex-wrap items-center justify-between gap-x-4">
						<span className="skeleton w-[8ch]" />
						<span className="skeleton w-[8ch]" />
					</div>

					<div className="inline-flex items-center gap-2">
						<div className="skeleton size-lh shrink-0 rounded-full" />
						<span className="skeleton w-[8ch]" />
					</div>
				</div>
			</div>

			<hr className="max-md:full-bleed border-stroke md:order-first" />

			<div className="grid items-start gap-x-4 gap-y-8 sm:grid-cols-[repeat(auto-fill,minmax(var(--container-sm),1fr))]">
				{Array.from({ length: postsPerPage }).map((_, index) => (
					// post-preview
					<li
						className="grid animate-pulse gap-2"
						style={{ animationDelay: `${index * 0.2}s` }}
						key={index}
					>
						<div className="skeleton aspect-video h-auto w-full" />

						<div className="skeleton" />

						<div className="flex flex-wrap items-center justify-between gap-x-4">
							<span className="skeleton w-[8ch]" />
							<span className="skeleton w-[8ch]" />
						</div>

						<div className="inline-flex items-center gap-2">
							<div className="skeleton size-lh shrink-0 rounded-full" />
							<span className="skeleton w-[8ch]" />
						</div>
					</li>
				))}
			</div>
		</>
	)
}

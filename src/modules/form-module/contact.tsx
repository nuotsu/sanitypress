import type { Form } from '@/sanity/types'

export default function ({ form }: { form: Form }) {
	return (
		<form className="gap-ch grid" action={form.endpoint} method="POST">
			<label>
				<span>Name</span>
				<input
					className="input w-full"
					name="name"
					type="text"
					autoComplete="name"
					placeholder="John Doe"
				/>
			</label>

			<label>
				<span>Email</span>
				<input
					className="input w-full"
					name="email"
					type="email"
					autoComplete="email"
					placeholder="john@example.com"
					required
				/>
			</label>

			<label>
				<span>Message</span>
				<textarea
					className="input w-full"
					name="message"
					placeholder="Your message..."
					rows={3}
				/>
			</label>

			<div>
				<button className="action max-sm:w-full" type="submit">
					Submit
				</button>
			</div>
		</form>
	)
}

export const TitleBar = (props: React.HTMLProps<HTMLDivElement>) => (
	<div
		{...props}
		style={{
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'baseline',
		}}
	>
		{props.children}
	</div>
);

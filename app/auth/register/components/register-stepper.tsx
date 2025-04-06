import {Stepper, StepperItem, StepperIndicator} from "@/components/ui/stepper";

export const RegisterStepper = ({currentStep}: {currentStep: number}) => {
	return (
		<Stepper defaultValue={currentStep} className="items-start gap-4">
			{[1, 2, 3].map((step) => (
				<StepperItem key={step} step={step} className="flex-1">
					<StepperIndicator asChild className="h-2 w-full bg-border">
						<span className="sr-only">{step}</span>
					</StepperIndicator>
				</StepperItem>
			))}
		</Stepper>
	);
};

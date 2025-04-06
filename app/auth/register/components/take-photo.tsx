import {CardContent, CardHeader} from "@/components/ui/card";
import Image from "next/image";
import {RegisterStepper} from "./register-stepper";
import {Button} from "@/components/ui/button";
import {useRef, useState, useCallback, useEffect} from "react";
import {cn} from "@/lib/utils";
import {UserRegisterData} from "@/types/types";

const IMAGE_HEIGHT = 450;
const IMAGE_WIDTH = 350;

interface Page2Props {
	setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
	setUserRegistrationData: React.Dispatch<
		React.SetStateAction<UserRegisterData>
	>;
}

export const TakePhoto: React.FC<Page2Props> = ({
	setCurrentStep,
	setUserRegistrationData,
}) => {
	// Refs for video and canvas elements
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [isCameraOn, setIsCameraOn] = useState(false);
	const [photo, setPhoto] = useState<string | null>(null);
	const [cameraError, setCameraError] = useState<string | null>(null);
	const [countdown, setCountdown] = useState<number | null>(null);
	const [isCapturing, setIsCapturing] = useState(false);

	// Start the camera
	const startCamera = useCallback(async () => {
		setCameraError(null); // Reset camera error state
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: {
					width: {ideal: IMAGE_WIDTH},
					height: {ideal: IMAGE_HEIGHT},
					facingMode: "user",
				},
				audio: false,
			});

			if (videoRef.current) {
				videoRef.current.srcObject = stream;
				setIsCameraOn(true);
				setCameraError(null);
			}
		} catch (err) {
			console.error("Error accessing camera:", err);
			setCameraError(
				"Could not access your camera. Please check permissions and try again."
			);
			setIsCameraOn(false);
		}
	}, []);

	// Stop the camera
	const stopCamera = useCallback(() => {
		const stream = videoRef.current?.srcObject as MediaStream;
		if (stream) {
			const tracks = stream.getTracks();
			tracks.forEach((track) => track.stop());
			videoRef.current!.srcObject = null;
			setIsCameraOn(false);
		}
	}, []);

	// Clean up when component unmounts
	useEffect(() => {
		return () => {
			if (isCameraOn) {
				stopCamera();
			}
		};
	}, [isCameraOn, stopCamera]);

	// Take a photo with a countdown
	const capturePhotoWithCountdown = () => {
		// Prevent multiple capture processes
		if (isCapturing) return;

		setIsCapturing(true);
		setCountdown(3);

		const countdownInterval = setInterval(() => {
			setCountdown((prev) => {
				if (prev === 1) {
					clearInterval(countdownInterval);
					console.log("Taking photo...");
					capturePhoto();
					return null;
				}
				return prev ? prev - 1 : null;
			});
		}, 1000);
	};

	// Capture photo from video stream
	const capturePhoto = () => {
		if (videoRef.current && canvasRef.current) {
			// Ensure the video has loaded metadata
			if (videoRef.current.readyState < 2) {
				console.log("Video not ready, waiting...");
				videoRef.current.onloadeddata = () => {
					performCapture();
				};
			} else {
				performCapture();
			}
		}
	};

	// Extract the actual capture logic to a separate function
	const performCapture = () => {
		const canvas = canvasRef.current;
		const video = videoRef.current;

		if (!canvas || !video) return;

		const context = canvas.getContext("2d");

		if (context) {
			try {
				// Set canvas dimensions to match video dimensions
				canvas.width = video.videoWidth || IMAGE_WIDTH;
				canvas.height = video.videoHeight || IMAGE_HEIGHT;

				// Clear the canvas first
				context.clearRect(0, 0, canvas.width, canvas.height);

				// Save context state
				context.save();

				// Mirror the canvas context if video is mirrored
				context.scale(-1, 1);
				context.translate(-canvas.width, 0);

				// Draw video frame to canvas with the mirroring applied
				context.drawImage(video, 0, 0, canvas.width, canvas.height);

				// Restore context state
				context.restore();

				// Convert canvas to data URL with higher quality
				const photoDataUrl = canvas.toDataURL("image/jpeg", 0.95);
				console.log(
					"Captured photo data URL length:",
					photoDataUrl.length
				);

				// Only set photo if we have a valid data URL
				if (photoDataUrl && photoDataUrl.includes("data:image")) {
					setPhoto(photoDataUrl);

					// Stop the camera after taking photo
					stopCamera();
				} else {
					console.error("Invalid photo data URL");
				}
			} catch (error) {
				console.error("Error capturing photo:", error);
			} finally {
				setIsCapturing(false);
			}
		}
	};

	// Retake photo
	const retakePhoto = () => {
		setPhoto(null);
		startCamera();
	};

	// Start camera when component mounts
	useEffect(() => {
		startCamera();

		return () => {
			stopCamera();
		};
	}, [startCamera, stopCamera]);

	return (
		<>
			<CardHeader className="items-center justify-center w-full">
				<Image
					src={"/cobaju_logo.png"}
					alt="Cobaju Logo"
					width={230.58}
					height={72}
					className="object-cover w-40"
				/>
			</CardHeader>
			<CardContent className="text-center -mt-4">
				<RegisterStepper currentStep={2} />

				<h3 className="font-semibold text-3xl text-primary-dark mt-6">
					Take a Full Body Photo
				</h3>
				<h2 className="text-secondary-grey font-medium">
					Stand straight in front of the camera. Make sure your whole
					body fits within the frame.
				</h2>

				<div className="w-full flex flex-col items-center justify-center mt-8 h-fit relative">
					{cameraError && (
						<div
							className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
							style={{width: IMAGE_WIDTH}}
						>
							<p>{cameraError}</p>
							<Button
								onClick={startCamera}
								variant="outline"
								className="mt-2"
							>
								Try Again
							</Button>
						</div>
					)}

					{!cameraError && (
						<>
							{/* Hidden canvas for image capture */}
							<canvas ref={canvasRef} style={{display: "none"}} />

							{photo ? (
								// Display captured photo
								<div
									className="bg-white rounded-xl overflow-hidden"
									style={{
										height: IMAGE_HEIGHT,
										width: IMAGE_WIDTH,
									}}
								>
									<Image
										width={IMAGE_WIDTH}
										height={IMAGE_HEIGHT}
										src={photo}
										alt="Captured photo"
										style={{
											height: "100%",
											width: "100%",
											objectFit: "cover",
										}}
									/>
								</div>
							) : (
								// Camera viewport
								<div
									className={cn(
										"bg-black rounded-xl overflow-hidden relative",
										!isCameraOn && "bg-secondary-grey"
									)}
									style={{
										height: IMAGE_HEIGHT,
										width: IMAGE_WIDTH,
									}}
								>
									<video
										ref={videoRef}
										autoPlay
										playsInline
										muted
										style={{
											height: "100%",
											width: "100%",
											objectFit: "cover",
											transform: "scaleX(-1)", // Mirror effect
										}}
									/>

									{/* Countdown overlay */}
									{countdown && (
										<div className="absolute inset-0 flex items-center justify-center bg-transparent">
											<span className="text-white text-7xl font-bold bg-opacity-40 rounded-full w-32 h-32 flex items-center justify-center">
												{countdown}
											</span>
										</div>
									)}

									{/* Guide lines */}
									<div className="absolute inset-0">
										<div className="h-full w-full border-2 border-dashed border-white opacity-40"></div>
									</div>
								</div>
							)}
						</>
					)}
				</div>

				{photo ? (
					<div className="flex gap-4 justify-center mt-6">
						<Button
							variant="outline"
							onClick={retakePhoto}
							className="w-1/3 text-md"
						>
							Retake
						</Button>
						<Button
							type="button"
							className="w-1/3 text-md"
							onClick={() => {
								// Here you would save the photo or proceed to next step
								console.log("Photo saved:", photo);
								// You can convert the data URL to a File or Blob here
								// Then pass it to the next step or save it

								setUserRegistrationData((prev) => ({
									...prev,
									image_url: photo,
								}));
								setCurrentStep(3);
							}}
						>
							Continue
						</Button>
					</div>
				) : (
					<Button
						type="button"
						onClick={capturePhotoWithCountdown}
						className="mt-6 w-2/3 text-md"
						disabled={
							!isCameraOn || countdown !== null || isCapturing
						}
					>
						{countdown
							? `Capturing in ${countdown}...`
							: isCapturing
							? "Processing..."
							: "Capture Photo"}
					</Button>
				)}

				<p className="text-secondary-grey text-xs mt-8 max-w-1/2 mx-auto">
					Your photo will only be used for virtual try-on and
					won&#39;t be shared with anyone.
				</p>
			</CardContent>
		</>
	);
};

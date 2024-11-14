import Image from "next/image";

export function Logo() {
    return (
        <div className="flex justify-center mt-4 mb-6">
            <Image src={"/logo.png"} alt="logo" width={200} height={200} />
        </div>
    )
}
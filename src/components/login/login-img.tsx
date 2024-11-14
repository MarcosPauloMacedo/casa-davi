import Image from "next/image";

export function LoginImg() {
    return (
        <div className="relative lg:w-[350px] lg:h-[410px] md:w-[300px] md:h-[350px]">
            <Image
                src="/img-login.png"
                alt="imagem-Login"
                fill={true}
                objectFit="cover"
                sizes="100%"
            />
        </div>

    )
}
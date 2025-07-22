import Image from 'next/image'

export default function Logo({ width, height }) {
    return (
        <>
            <Image src="/logo.png" width={width} height={height} alt="logo" />
            {/* <Image src="/logo.png" width={420} height={191} alt="logo" /> */}
        </>
        
    );
}

import Image from 'next/image';

function Logo() {
  return (
    <div>
      <Image 
        src="/images/logo.png" 
        alt="Logo" 
        width={60} 
        height={10} 
      />
    </div>
  );
}

export default Logo;


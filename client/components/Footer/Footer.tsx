import Link from "next/link"

type ListItemProps = {
  title: string,
  link: string
}
const LinkItem = ({ title, link }: ListItemProps) => {
  return <Link href={link}><span className="m-0 mt-0.5 ml-4 font-semibold hover:text-[#ef4444] cursor-pointer">{title}</span></Link>
}

const Footer = () => {
  return <>
    <div className="flex w-full mt-2 p-4 bg-white justify-center">
      <div className="flex w-full md:w-3/5 flex-row justify-center items-center">
        <Link href={'/'}><img src="/assets/giftamatic.png" alt="logo" className="h-10 cursor-pointer"/></Link>
        <LinkItem link="mailto:contact@giftamatic.org" title="Contact Us" />
        <LinkItem link="https://github.com/giftamatic" title="GitHub" />
        <LinkItem link="https://twitter.com/giftamatic" title="Twitter" />
      </div>
    </div>
  </>
}

export default Footer
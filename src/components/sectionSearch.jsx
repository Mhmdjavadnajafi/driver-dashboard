export default function SectionSearch() {
    return (
        <div className="col-span-12 sm:col-span-2 h-[50px]">
            <input
                type="search"
                placeholder="بخش"
                className="h-12 w-full px-4 vazir-medium text-[#909090] font-bold border rounded-xl transition-all duration-300 ease-in-out bg-white
               border-[#909090] focus:border-[#B9A278] focus:shadow-md focus:scale-105"
            />
        </div>
    )
}
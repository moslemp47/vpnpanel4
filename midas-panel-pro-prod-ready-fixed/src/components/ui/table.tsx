export function Table({children}:{children:React.ReactNode}){return <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800"><table className="w-full text-sm">{children}</table></div>}
export const THead=({children}:{children:React.ReactNode})=> <thead className="bg-neutral-50 dark:bg-neutral-900/60">{children}</thead>
export const TBody=({children}:{children:React.ReactNode})=> <tbody className="[&>tr:nth-child(even)]:bg-neutral-50/60 dark:[&>tr:nth-child(even)]:bg-neutral-900/40">{children}</tbody>
export const TR=({children}:{children:React.ReactNode})=> <tr className="border-b last:border-0 border-neutral-200 dark:border-neutral-800">{children}</tr>
export const TH=({children}:{children:React.ReactNode})=> <th className="px-3 py-2 text-left font-medium">{children}</th>
export const TD=({children}:{children:React.ReactNode})=> <td className="px-3 py-2">{children}</td>

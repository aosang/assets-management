'use client'


type tableItems = {
  title: string
  type: string
  brand: string
}

interface workTableProps {
  id: string
  workInfo: tableItems[]
}

const WorkTable: React.FC<workTableProps> = ({ id, workInfo }) => {
  return (
    <>
      <div>WorkTable</div>
      <ul>
        {workInfo.map((item, index) => {
          return <li key={index}>
            <p>{item.title}</p>
            <p>{item.brand}</p>
            <p>{item.type}</p>
          </li>
        })}
      </ul>
    </>
  )
}
 
export default WorkTable;
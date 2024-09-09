'use client'

interface workTableProps {
  id: string
  workInfo: []
}

const WorkTable: React.FC<workTableProps> = ({ id, workInfo }) => {
  console.log(workInfo);
  
  return (
    <>
      <div>WorkTable</div>
    </>
  )
}
 
export default WorkTable;
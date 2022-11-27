import { GetServerSideProps } from 'next'
import repositoryApi from '../../api/repositoryApi'
import PageLayout from "../../components/layouts/PageLayout"
import { IDeparment } from '../../types/department'

type Props = {
  departments: IDeparment;
}

function ResourcesPage({departments}:Props) {
  console.log(departments);
  
  return (
    <PageLayout>
      Recursos
    </PageLayout>
  )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async () => {
  const {data} = await repositoryApi.get("/department");

  return {
    props: {
      departments: data
    }
  }
}

export default ResourcesPage

import AccountBox from '../../components/account/AccountBox'
import TopSearch from '../../components/layouts/TopSearch'

const Account = () => {
  return (
    <div className='flex flex-col gap-4'>
      <TopSearch />
      <AccountBox />
    </div>
  )
}

export default Account

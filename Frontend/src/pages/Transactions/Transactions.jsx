import React from 'react'
import TopSearch from '../../components/layouts/TopSearch'
import TransactionRec from '../../components/transactions/TransactionRec'

const Transactions = () => {
  return (
    <div className='flex flex-col gap-4'>
      <TopSearch />
      <TransactionRec />
    </div>
  )
}

export default Transactions
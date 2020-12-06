import React, { useEffect, useState } from 'react'
import { Column, usePagination, useTable } from 'react-table'

import './App.scss'

const syncLink = 'http://www.strava.com/oauth/authorize?'
  + `client_id=${process.env.REACT_APP_STRAVA_CLIENT_ID}`
  + '&response_type=code'
  + `&redirect_uri=${process.env.REACT_APP_API_BASE}/strava/callback`
  + '&approval_prompt=force'
  + '&scope=read'
const baseColumns = [
  {
    id: 'rank',
    Header: 'Rank'
  },
  {
    id: 'name',
    Header: 'Name',
    accessor: 'name'
  },
  {
    id: 'efforts',
    Header: 'Efforts',
    accessor: 'efforts'
  },
] as Column[]

function Table (props: any) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    // @ts-ignore
    page,
    // @ts-ignore
    state: { pageIndex, pageSize },
    // @ts-ignore
    gotoPage,
    // @ts-ignore
    previousPage,
    // @ts-ignore
    nextPage,
    // @ts-ignore
    setPageSize,
    // @ts-ignore
    canPreviousPage,
    // @ts-ignore
    canNextPage
  } = useTable({
    columns: props.columns,
    data: props.data
  }, usePagination)

  const [paginationElements, setPaginationElements] = useState([] as JSX.Element[])
  // eslint-disable-next-line
  useEffect(init, [])

  function init () {
    setPageSize(10)

    setPaginationElements(Array(Math.ceil(props.data.length / pageSize)).fill(0).map((el: any, i: number) => (
      <li key={i}>
        <button className={'pagination-link' + (pageIndex === i ? ' is-current' : '')}
                aria-label={'Page ' + (i + 1)}
                aria-current="page"
                onClick={gotoPage(i)}>
          {i + 1}
        </button>
      </li>
    )))
  }

  return (
    <>
      <table style={{ height: '200px' }} className="table is-fullwidth" {...getTableProps()}>
        <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
        </thead>
        <tbody {...getTableBodyProps()}>
        {page.map((row: any, i: number) => {
          prepareRow(row)

          return (
            <tr key={i} {...row.getRowProps()}>
              {row.cells.map((cell: any) => {
                if (cell.column.id === 'rank') {
                  return (
                    <td key={cell.column.Header} {...cell.getCellProps()}>
                      {i + 1}
                    </td>
                  )
                }

                return (
                  <td key={cell.column.Header} {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
        </tbody>
      </table>

      <nav className="pagination" role="navigation" aria-label="pagination">
        <button className="pagination-previous" disabled={!canPreviousPage} onClick={previousPage}>
          Previous
        </button>

        <button className="pagination-next" disabled={!canNextPage} onClick={nextPage}>
          Next
        </button>

        <ul className="pagination-list">
          {paginationElements}
        </ul>
      </nav>
    </>
  )
}

function App () {
  const [leaderboards, setLeaderboards] = useState([] as JSX.Element[])

  useEffect(init, [])

  function init () {
    async function loadData () {
      const res = await fetch(`${process.env.REACT_APP_API_BASE}/segments`)
      const data = await res.json()

      setLeaderboards(data.map((segment: any) => {
        return (
          <div key={segment.id} className="column is-half leaderboard">
            <div className="box">
              <h2 className="subtitle">
                {segment.segmentName}
              </h2>

              <Table columns={baseColumns} data={segment.entries} />
            </div>
          </div>
        )
      }))
    }

    loadData()
  }

  return (
    <div className="App">
      <section className="section home">
        <h1 className="title">BC</h1>

        <a href={syncLink}>
          <button className="button is-primary">
            Update my stats
          </button>
        </a>
      </section>

      <section className="section">
        <div className="columns">
          {leaderboards}
        </div>
      </section>
    </div>
  )
}

export default App

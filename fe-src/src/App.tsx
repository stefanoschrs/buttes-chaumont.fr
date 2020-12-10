import React, { useEffect, useState } from 'react'
import { Column, usePagination, useTable } from 'react-table'

import './App.scss'
import stravaLogo from './assets/strava.svg'

interface Entry {
  pr: number
  efforts: number
}

const syncLink = 'http://www.strava.com/oauth/authorize?'
  + `client_id=${process.env.REACT_APP_STRAVA_CLIENT_ID}`
  + '&response_type=code'
  + `&redirect_uri=${process.env.REACT_APP_API_BASE}/strava/callback`
  + '&scope=read'
const instagramMediaUrl = 'https://www.instagram.com/explore/locations/260718750/parc-des-buttes-chaumont/'

const baseColumns = [
  {
    id: 'rank',
    Header: 'Rank'
  },
  {
    id: 'name',
    Header: 'Name',
    accessor: 'name'
  }
] as Column[]
const prColumns = [
  ...baseColumns,
  {
    id: 'pr',
    Header: 'Time',
    accessor: 'pr',
    Cell: (props: any) => {
      const date = new Date(0)
      date.setSeconds(props.cell.value)
      return date.toISOString().substr(11, 8)
    }
  }
]
const effortsColumns = [
  ...baseColumns,
  {
    id: 'efforts',
    Header: 'Efforts',
    accessor: 'efforts'
  }
]

function StravaButton () {
  return (
    <div className="StravaButton">
      <span>Update my stats</span>
      <img src={stravaLogo} alt="Strava Logo"/>
    </div>
  )
}

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
  const [data, setData] = useState([] as any)
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [tabsHeaderItems, setTabsHeaderItems] = useState([] as JSX.Element[])
  const [leaderboards, setLeaderboards] = useState([] as JSX.Element[])
  const [igPosts, setIgPosts] = useState([] as JSX.Element[])
  const [igLoading, setIgLoading] = useState(true)

  useEffect(init, [])
  useEffect(processData, [data, activeTabIndex])

  function init () {
    async function loadData () {
      const res = await fetch(`${process.env.REACT_APP_API_BASE}/segments`)
      const dat = await res.json()

      dat.sort((a: any, b: any) => a.segmentName > b.segmentName ? -1 : 1)
      setData([...dat.slice(2, 4), ...dat.slice(0, 2)])
    }

    async function loadInstagram () {
      const res = await fetch(instagramMediaUrl)
      const dat = await res.text()

      setIgLoading(false)

      // @ts-ignore
      const topPosts = JSON.parse(dat
        .split('\n')
        .find((l: string) => l.includes('_sharedData'))
        .match(/{.+}/)[0])
        .entry_data
        .LocationsPage[0]
        .graphql
        .location
        .edge_location_to_top_posts
        .edges

      setIgPosts(topPosts.slice(0, 15).map((post: any) => {
        return (
          <div key={post.node.shortcode} className="column is-one-fifth post">
            <a rel="nofollow noopener noreferrer" target="_blank"
               className="link" href={'https://instagram.com/p/' + post.node.shortcode}>
              <img className="image" src={post.node.thumbnail_src} alt={'Instagram Post ' + post.node.shortcode}/>
            </a>
          </div>
        )
      }))
    }

    loadData()
    loadInstagram()
  }

  function processData () {
    if (!data.length) {
      return
    }

    setTabsHeaderItems(data.map((segment: any, index: number) => {
      return (
        <li key={index}
            className={activeTabIndex === index ? 'is-active' : ''}
            onClick={() => setActiveTabIndex(index)}>
          {/* eslint-disable-next-line*/}
          <a>{segment.segmentName}</a>
        </li>
      )
    }))

    const curSegment = data[activeTabIndex]
    setLeaderboards([
      <div key={curSegment.id + '-time'} className="column is-half leaderboard">
        <div className="box">
          <h2 className="subtitle">Time</h2>

          <Table columns={prColumns} data={curSegment.entries.sort((a: Entry, b: Entry) => a.efforts - b.efforts)}/>
        </div>
      </div>,
      <div key={curSegment.id + '-efforts'} className="column is-half leaderboard">
        <div className="box">
          <h2 className="subtitle">Efforts</h2>

          <Table columns={effortsColumns} data={curSegment.entries.sort((a: Entry, b: Entry) => a.pr - b.pr)}/>
        </div>
      </div>
    ])
  }

  return (
    <div className="App">
      <section className="section home">
        <div className="overlay"/>

        <div className="content">
          <h1 className="title">Parc des Buttes Chaumont</h1>

          <a href={syncLink}>
            <StravaButton/>
          </a>
        </div>
      </section>

      <section className="section leaderboards">
        <h1 className="title has-text-centered">Leaderboard</h1>
        <br/>

        <div className="container">
          <div className="tabs is-centered">
            <ul>
              {tabsHeaderItems}
            </ul>
          </div>

          <div className="columns">
            {leaderboards}
          </div>
        </div>
      </section>

      <section className="section history">
        <h1 className="title has-text-centered">History</h1>
        <br/>

        <div className="container">
          <p className="paragraph">
            The Parc des Buttes Chaumont (pronounced [paʁk de byt ʃomɔ̃]) is a public park situated in northeastern
            Paris, France, in the 19th arrondissement. Occupying 24.7 hectares (61 acres), it is the fifth-largest park
            in Paris, after the Bois de Vincennes, Bois de Boulogne, Parc de la Villette and Tuileries Garden.
          </p>

          <p className="paragraph">
            Opened in 1867, late in the regime of Napoleon III, it was built according to plans by Jean-Charles Adolphe
            Alphand, who created all the major parks demanded by the Emperor. The park has 5.5 kilometres (3.4 miles) of
            roads and 2.2 kilometres (1.4 miles) of paths. The most famous feature of the park is the Temple de la
            Sibylle, inspired by the Temple of Vesta in Tivoli, Italy, and perched at the top of a cliff fifty metres
            above the waters of the artificial lake.
          </p>

          <p className="paragraph">
            <a rel="nofollow noopener noreferrer" target="_blank"
               href="https://en.wikipedia.org/wiki/Parc_des_Buttes_Chaumont">
              <i>Read More..</i>
            </a>
          </p>
        </div>
      </section>

      <section className="section instagram">
        <h1 className="title has-text-centered">Media</h1>
        <br/>

        <div className="container">
          <div className="columns is-flex-wrap-wrap">
            {!igLoading && igPosts}
            {igLoading && (
              <div className="loading-container">
                <i>Loading Media..</i>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="footer has-text-grey has-background-grey-darker has-text-centered">
        <div>&copy; buttes-chaumont.fr {new Date().getFullYear()}</div>

        <div className="social">
          <a rel="noreferrer noopener nofollow" target="_blank" href="https://www.facebook.com/buttes-chaumont.fr/">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="#7a7a7a"
                    d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-3 7h-1.924c-.615 0-1.076.252-1.076.889v1.111h3l-.238 3h-2.762v8h-3v-8h-2v-3h2v-1.923c0-2.022 1.064-3.077 3.461-3.077h2.539v3z"/>
            </svg>
          </a>
        </div>
      </footer>
    </div>
  )
}

export default App

import React, { useEffect } from 'react'
import { useLocalStorage } from '@rehooks/local-storage'
import api from '../../services/api'
import './style.css'

import Structure from '../../components/Structure'
import FormNewQuestion from '../../components/FormNewQuestion'
import FormFilter from '../../components/FormFilter'
import QuestionList from '../../components/QuestionList'
import { Row, Col } from 'react-bootstrap'

export default () => {

  const [ data, setData ] = useLocalStorage('questions', {})
  const [ order, setOrder ] = useLocalStorage('order')
  const [ filter, setFilter ] = useLocalStorage('filter')
  const [ pagination, setPagination ] = useLocalStorage('pagination')

  const [ orderField, setOrderField ] = useLocalStorage('orderField')
  const [ orderDirection, setOrderDirection ] = useLocalStorage('orderDirection')

  const [ filterText, setFilterText ] = useLocalStorage('filterText')
  const [ filterMethod, setFilterMethod ] = useLocalStorage('filterMethod')
  const [ filterField, setFilterField ] = useLocalStorage('filterField')

  async function getQuestions(filterValue = undefined, orderValue = undefined, paginationValue = undefined) {
    try {
      orderValue = orderValue !== undefined ? orderValue : order
      filterValue = filterValue !== undefined ? filterValue : filter
      paginationValue = paginationValue !== undefined ? paginationValue : pagination

      let query = ''

      if (orderValue) {
        query = `?${orderValue}`
      }

      if (filterValue) {
        if (query === '') {
          query = '?'
        } else {
          query += '&'
        }
        query += filterValue
      }

      if (paginationValue) {
        if (query === '') {
          query = '?'
        } else {
          query += '&'
        }
        query += paginationValue
      }

      const res = await api.get(`/v1/questions${query}`)

      setData(res.data)
    } catch(e) {
      alert('Não foi possível carregar a lista de perguntas do servidor.')
    }
  }

  useEffect(() => {
    getQuestions()
  }, [])

  async function addQuestion(user, title, text) {
    try {
      await api.post('/v1/questions', { user, title, text})

      getQuestions()

      return true
    } catch(e) {
      alert('Não foi possível incluir a nova pergunta')

      return false
    }
  }

  async function handleSearch(value, method, field) {
    setFilterText(value)
    setFilterMethod(method)
    setFilterField(field)

    let filterValue = ''
    if (value !== '') {
      switch (method) {
        case 'b':
          value = `${value}%`
          break;

        case 'm':
          value = `%${value}%`
          break;

        case 'e':
          value = `%${value}`
          break;

        default:
          break;
      }

      filterValue = `${field}=${value}`
    }

    await setFilter(filterValue)

    getQuestions(filterValue)
  }

  async function handleDelete(id) {
    try {
      await api.delete(`/v1/questions/${id}`)

      getQuestions()
    } catch(e) {
      alert('Não foi possível apagar a pergunta pergunta')
    }
  }

  async function handleOrder(field, direction) {
    setOrderField(field)
    setOrderDirection(direction)

    if ((field === undefined) && (direction === undefined)) {
      setOrder('')
      getQuestions(undefined, '')
    } else {
      if (direction === 'desc') {
        field = `-${field}`
      }
      field = `order=${field}`

      setOrder(field)

      getQuestions(undefined, field)
    }
  }

  async function handleLike(id) {
    try {
      await api.post(`/v1/questions/${id}/like`)

      getQuestions()
    } catch(e) {
      alert('Não foi possível registrar o like para a pergunta')
    }
  }

  async function handleDislike(id) {
    try {
      await api.post(`/v1/questions/${id}/dislike`)

      getQuestions()
    } catch(e) {
      alert('Não foi possível registrar o dislike para a pergunta')
    }
  }

  async function handlePagination(page, perPage) {
    const value = `page=${page}&perpage=${perPage}`
    setPagination(value)

    getQuestions(undefined, undefined, value)
  }

  return (
    <Structure>
      <Row>
        <Col>
          <FormNewQuestion onSave={ addQuestion }/>
        </Col>
      </Row>

      <Row>
        <Col>
          <FormFilter
            value={ filterText }
            method={ filterMethod }
            field={ filterField }
            onSearch={ handleSearch }
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <QuestionList
            data={ data }

            orderField={ orderField }
            orderDirection={ orderDirection }

            onOrder={ handleOrder }
            onPaginate={ handlePagination }
            onDelete={ handleDelete }
            onLike={ handleLike }
            onDislike={ handleDislike }
          />
        </Col>
      </Row>
    </Structure>
  )
}

import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactLoading from 'react-loading'

import CryptoCoin from '../../models/CryptoCoin'
import CurrencyService from '../../services/CurrencyService'
import {
  BackButton,
  BackLink,
  BackLinkPanel,
  Container,
  CryptoPanel,
  LoadingArea,
  PanelRow,
  RowKey,
  RowValue,
} from './styles'
import { VsCurrencyContext } from '../../context/VsCurrencyContext'

type Params = {
  id: string
  name: string
}

const Crypto = () => {
  /**
   * Utilizaremos o hook useParams para
   * resgatar os parâmetros recebidos no
   * componente da página.
   */
  const { id, name } = useParams<Params>()
  const [cryptoCoin, setCryptoCoin] = useState<CryptoCoin>({
    id: '',
    name: '',
    usd24hChange: 0,
    usd24hVolume: 0,
    usdMarketCap: 0,
    usdPrice: 0,
  })
  const [areCoinDetailsLoaded, setAreCoinDetailsLoaded] = useState(false)

  const { vsCurrency } = useContext(VsCurrencyContext)

  const currencyService = new CurrencyService()

  const loadCryptoCoin = async () => {
    if (id && name) {
      const crypto = await currencyService.getCoin(id, name, vsCurrency)
      setCryptoCoin(crypto)
      setAreCoinDetailsLoaded(true)
    }
  }

  useEffect(() => {
    loadCryptoCoin()
  }, [])

  return (
    <Container>
      {areCoinDetailsLoaded && (
        <div>
          <CryptoPanel>
            <PanelRow>
              <RowKey>Coin:</RowKey>
              <RowValue>{cryptoCoin.name}</RowValue>
            </PanelRow>
            <PanelRow>
              <RowKey>USD value:</RowKey>
              <RowValue>{cryptoCoin.usdPrice.toFixed(2)}</RowValue>
            </PanelRow>
            <PanelRow>
              <RowKey>Market Cap (USD):</RowKey>
              <RowValue>{cryptoCoin.usdMarketCap.toFixed(2)}</RowValue>
            </PanelRow>
            <PanelRow>
              <RowKey>24 Volume (USD):</RowKey>
              <RowValue>{cryptoCoin.usd24hVolume.toFixed(2)}</RowValue>
            </PanelRow>
            <PanelRow>
              <RowKey>24h Change (USD):</RowKey>
              <RowValue>{cryptoCoin.usd24hChange.toFixed(2)}%</RowValue>
            </PanelRow>
          </CryptoPanel>

          <BackLinkPanel>
            <BackLink to="/">
              <BackButton>Back to currencies</BackButton>
            </BackLink>
          </BackLinkPanel>
        </div>
      )}

      {!areCoinDetailsLoaded && (
        <LoadingArea data-testid="loading-area">
          <ReactLoading type="spin" color="#8c14fc" width={'100%'} />
        </LoadingArea>
      )}
    </Container>
  )
}

export default Crypto

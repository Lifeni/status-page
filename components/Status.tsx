import {
  Card,
  GeistUIThemesPalette,
  Spacer,
  Text,
  useTheme,
} from '@geist-ui/react'
import { Check, X } from '@geist-ui/react-icons'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

interface StatusProps {
  status: string
  palette: GeistUIThemesPalette
}

const Container = styled(Card)<StatusProps>`
  .content {
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  h3 {
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: ${props =>
      props.status === 'true' ? props.palette.success : props.palette.warning};
  }

  svg {
    stroke-width: 2.5;
    stroke: ${props =>
      props.status === 'true' ? props.palette.success : props.palette.warning};
  }
`

const Status = (props: { status: string }) => {
  const { status } = props
  const { palette } = useTheme()
  const { t } = useTranslation()

  return (
    <Container status={status} palette={palette}>
      <Spacer x={0.25} />
      {status ? (
        <>
          <Check size={36} />
          <Spacer x={1} />
          <Text h3>{t('global-status-ok')}</Text>
        </>
      ) : (
        <>
          <X size={36} />
          <Spacer x={1} />
          <Text h3>{t('global-status-error')}</Text>
        </>
      )}
      <Spacer x={0.25} />
    </Container>
  )
}

export default Status

import { Button, Fieldset, Spacer } from '@geist-ui/react'
import { CheckInCircleFill, RefreshCw } from '@geist-ui/react-icons'

export default function Status() {
  return (
    <section>
      <Fieldset>
        <Fieldset.Content>
          <Fieldset.Title>
            <CheckInCircleFill color="#4caf50" size="28" />
            <Spacer x={0.5} />
            所有服务正常运行中
          </Fieldset.Title>
        </Fieldset.Content>
        <Fieldset.Footer>
          {/* <Fieldset.Footer.Status>
            最后更新于 <strong> 下午 9:12:34 </strong>
          </Fieldset.Footer.Status> */}
          <Fieldset.Footer.Actions>
            <Button auto icon={<RefreshCw />} size="small">
              现在更新
            </Button>
          </Fieldset.Footer.Actions>
        </Fieldset.Footer>
      </Fieldset>
    </section>
  )
}

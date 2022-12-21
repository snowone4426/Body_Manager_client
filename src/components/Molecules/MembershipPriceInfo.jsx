import styled from 'styled-components'

export default function MembershipPriceInfo({ priceInfo }) {
  const line = (
    <HorizontalLine>
      <RoundEnd isRight={false} />
      --------------------------------------------------------------
      <RoundEnd isRight={true} />
    </HorizontalLine>
  )

  return (
    <MembershipPriceInfoContainer>
      <FormTitle>Price Infomation</FormTitle>
      <MembershipPriceInfoFrame>
        {line}
        {priceInfo.map((el) => (
          <>
            <PriceList key={el.price_name}>
              <ListContext>{el.price_name}</ListContext>
              <ListContext>₩ {el.price_info.toLocaleString()}</ListContext>
            </PriceList>
            {line}
          </>
        ))}
      </MembershipPriceInfoFrame>
    </MembershipPriceInfoContainer>
  )
}

const MembershipPriceInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 60%;
  border-radius: 1rem;
  padding: 1rem;
  background-color: white;
  overflow: hidden;
`

const FormTitle = styled.div`
  font-size: 2rem;
`

const MembershipPriceInfoFrame = styled.ul`
  width: 100%;
`

const PriceList = styled.li`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
  padding: 0 2rem;
`

const ListContext = styled.div`
  font-size: 1.5rem;
`

const HorizontalLine = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #99aeb4d8;
`

const RoundEnd = styled.div`
  position: relative;
  right: ${({ isRight }) => (isRight ? '-2.5rem' : '2.5rem')};
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: #99aeb489;
`

import { Flex, Grid, GridProps } from '@chakra-ui/react'

type Props = {
  children: React.ReactNode
  rootProps: GridProps
  gap?: number | string
  rowGap?: number | string
  columnGap?: number | string
  columns?: number
}

export const Container = ({
  children,
  columns,
  gap,
  rowGap,
  columnGap,
  rootProps,
}: Props) => {
  return columns ? (
    <Grid
      gap={gap}
      rowGap={rowGap}
      columnGap={columnGap}
      templateColumns={`repeat(${columns}, 1fr)`}
      {...rootProps}
    >
      {children}
    </Grid>
  ) : (
    <Flex
      gap={gap}
      rowGap={rowGap}
      columnGap={columnGap}
      flexWrap='wrap'
      {...rootProps}
    >
      {children}
    </Flex>
  )
}

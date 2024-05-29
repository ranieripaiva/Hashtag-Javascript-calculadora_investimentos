function convertToMonthlyReturnRate(yearlyReturnRate){
  return yearlyReturnRate **(1/12)
}

function generateReturnsArray(
  startingAmount =0, 
  timeHorizon =0, 
  timePeriod = 'monthly', 
  mounthlyContribution = 0, 
  returnRate = 0, 
  returnTimeFrame = 'monthly'){

    if(!timeHorizon || !startingAmount){
      throw new Error('Investimento inicial e prazo devem ser preenchidos com valores positivos.')
    }

    const finalReturnRate = returnTimeFrame === 'monthly' 
      ?  1 + returnRate/100
      : convertToMonthlyReturnRate(1 + returnRate/100)

    const finalTimeHerizon = 
      timePeriod === 'monthly' ? timeHorizon : timeHorizon * 12

    const referenceInvestimetObject = {
      investedAmount : startingAmount,
      interestReturns: 0,
      totalInterestReturns: 0,
      month: 0,
      totalAmount: startingAmount,
    }

    const returnsArray = [referenceInvestimetObject]
    for (let timeReference = 1; timeReference <= finalTimeHerizon; timeReference++){
      const totalAmount = 
        returnsArray[timeReference - 1].totalAmount * finalReturnRate + mounthlyContribution
      
      const interestReturns = returnsArray[timeReference - 1].totalAmount * finalReturnRate

      const investedAmount = startingAmount + mounthlyContribution * timeReference

      const totalInterestReturns = totalAmount - investedAmount

      returnsArray.push({
        investedAmount,
        interestReturns,
        totalInterestReturns,
        month: timeReference,
        totalAmount,
      })
    }

    return returnsArray
}
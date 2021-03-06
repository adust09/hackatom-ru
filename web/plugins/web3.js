import Web3 from "web3"

export default async function (context, inject) {
  let web3

  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    web3 = new Web3(window.ethereum)
    window.ethereum.enable().catch(error => {
      // User denied account access
      console.log(error)
    })
  } else if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    web3 = new Web3(window.web3.currentProvider)
  } else {
    const httpEndpoint = process.env.ROPSTEN_URL
    web3 = new Web3(new Web3.providers.HttpProvider(httpEndpoint))
  }

  inject('web3', web3)
}

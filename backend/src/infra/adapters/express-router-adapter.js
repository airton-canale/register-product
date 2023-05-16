const adaptRoute = (controller) => {
  return async (req, res) => {
    console.log('eex', req.body)
    const httpRequest = {
      query: req.query,
      body: req.body,
      params: req.params
    }
    const httpResponse = await controller(httpRequest)
    return res.status(httpResponse.status).json(httpResponse?.data).send()
  }
}

export { adaptRoute }
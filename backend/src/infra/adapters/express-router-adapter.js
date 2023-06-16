const adaptRoute = (controller) => {
  return async (req, res) => {
    const httpRequest = {
      query: req.query,
      body: req.body,
      params: req.params
    }
    const httpResponse = await controller(httpRequest)
    return res.status(httpResponse?.statusCode || 200).json(httpResponse?.data || null).send()
  }
}

export { adaptRoute }
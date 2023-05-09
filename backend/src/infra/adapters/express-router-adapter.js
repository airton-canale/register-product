const adaptRoute = (controller) => {
    return async (req, res) => {
          const httpRequest = {
            query: req.query,
            body: req.body,
            params: req.params
          }
          const httpResponse = await controller.handle(httpRequest)
          return res.status(httpResponse.status).json(httpResponse?.data).send()
        }
    }
        
    export { adaptRoute }
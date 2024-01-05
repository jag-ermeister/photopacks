function transformOrderToOrderPacks(order) {
  let orderPacks = []

  for (let i = 1; i <= 5; i++) {
    const promptPack = order[`prompt_pack_${i}`]
    const inferenceImageUrls = order[`pack_${i}_inference_image_urls`]

    if (promptPack) {
      orderPacks.push({
        id: order.id,
        display_id: order.display_id,
        user: order.user,
        model_type: order.model_type,
        prompt_pack: promptPack,
        is_success: order.is_success,
        zip_file_url: order.zip_file_url,
        training_image_urls: order.training_image_urls,
        inference_image_urls: inferenceImageUrls,
      })
    }
  }

  return orderPacks
}

function transformOrdersToOrderPacks(orders) {
  return orders.flatMap((order) => transformOrderToOrderPacks(order))
}

export { transformOrderToOrderPacks, transformOrdersToOrderPacks }

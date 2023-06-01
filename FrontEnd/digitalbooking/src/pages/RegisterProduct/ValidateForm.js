export const validateForm = (formData) => {
  const newErrors = {}

  if (!formData.codeProduct) 
    newErrors.codeProduct = 'El código de producto es requerido';

  if (!formData.productName.trim()) 
    newErrors.productName = 'El nombre del producto es requerido';
  
  if (!formData.category) 
    newErrors.category = 'La categoría es requerida';
  
  if (formData.score.trim() === '') {
    newErrors.score = 'La calificación es requerida';
  } else if (isNaN(formData.score) || formData.score < 0 || formData.score > 10) {
    newErrors.score = 'La calificación debe ser un número entre 0 y 10';
  }

  const price = parseFloat(formData.price);
  if (isNaN(price) || price <= 0) 
    newErrors.price = 'El precio debe ser un número mayor a 0';

  if (!formData.country.trim())
    newErrors.country = 'El país es requerido';

  if (!formData.city.trim())
    newErrors.city = 'La ciudad es requerida';

  if (!isValidUrl(formData.location))
    newErrors.location = 'La URL de ubicación no es válida';

  if (formData.description.trim() === '')
    newErrors.description = 'La descripción es requerida';

  if (formData.productImage === null)
    newErrors.productImage = 'Debes agregar una foto del producto a registrar';

  return {
    ok: Object.keys(newErrors).length === 0,
    newErrors: newErrors
  }
}

const isValidUrl = (url) => {
  let flag = false;
  if(url.includes('https://')){
    flag = true;
  }
  return flag
};
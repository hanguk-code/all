<?php

namespace App\Repositories\Web;

use App\Models\Product\OcProduct;
//use App\Models\Product\ProductAttribute;
use App\Models\Category\OcCategory;
//use App\Models\Reference\Tag;
use App\Models\Attribute\OcAttribute;
use App\Models\OcUrlAlias;

class ProductRepository
{
    protected $product;
    //protected $productAttribute;
    protected $category;
    //protected $tag;
    protected $attribute;
    protected $urlAlias;

    /**
     * ItemRepository constructor.
     * @param OcProduct          $product
     * @param ProductAttribute $productAttribute
     * @param OcCategory         $category
     * @param Tag              $tag
     * @param  OcAttribute        $attribute
     * @param OcUrlAlias $urlAlias
     */
    public function __construct(
        OcProduct          $product,
        //ProductAttribute $productAttribute,
        OcCategory         $category,
        //Tag              $tag,
        OcAttribute        $attribute,
        OcUrlAlias         $urlAlias
    )
    {
        $this->product          = $product;
        //$this->productAttribute = $productAttribute;
        $this->category         = $category;
        //$this->tag              = $tag;
        $this->attribute        = $attribute;
        $this->urlAlias         = $urlAlias;
    }

    /**
     * {@inheritDoc}
     */
    public function all($request)
    {
       
    }

    public function newLimit($request)
    {
        $limit = $request->input('limit') ?? 3;
        $product = $this->product->with('description')->where('upc', 'new')->where('status', 'active')->orderBy('sort_order', 'asc')->limit($limit)->get();

        $productData = [];
        foreach ($product as $item) {
            $category = $this->category->find($item['product_id']);
            $quCat = 'category_id='.$item['category_id'];
            $urlAliasCat = $this->urlAlias->where('query', $quCat)->first();

            $qu = 'product_id='.$item['product_id'];
            $urlAlias = $this->urlAlias->where('query', $qu)->first();

            if($category['parent_id']) {
                $categoryChild = $this->category->find($category['parent_id']);
                $quCatChild = 'category_id='.$item['category_id'];
                $urlAliasCatChild = $this->urlAlias->where('query', $quCatChild)->first();
                $url = $urlAliasCatChild['keyword'].'/'.$urlAliasCat['keyword'].'/'.$urlAlias['keyword'];
            } else {
                $url = $urlAliasCat['keyword'].'/'.$urlAlias['keyword'];
            }

            $productData[] = [
                'id'        => $item['product_id'],
                'name'      => $item['description']['name'],
                'image_url' => $item['image'],
                'url'       => $url,
                'price'     => $item['price'],
                'article'   => $item['sku'],
            ];
        }

        return $productData;
    }

    public function newAll($request)
    {   
        $length = 12;
        $page = $request->input('page') ?? 3;
        $product = $this->product->with('description')->inRandomOrder()->where('upc', 'new')->where('status', 'active')->orderBy('sort_order', 'asc')->paginate($length);

        $productData = [];
        foreach ($product as $item) {
            $category = $this->category->find($item['product_id']);
            $quCat = 'category_id='.$item['category_id'];
            $urlAliasCat = $this->urlAlias->where('query', $quCat)->first();

            $qu = 'product_id='.$item['product_id'];
            $urlAlias = $this->urlAlias->where('query', $qu)->first();

            if($category['parent_id']) {
                $categoryChild = $this->category->find($category['parent_id']);
                $quCatChild = 'category_id='.$item['category_id'];
                $urlAliasCatChild = $this->urlAlias->where('query', $quCatChild)->first();
                $url = $urlAliasCatChild['keyword'].'/'.$urlAliasCat['keyword'].'/'.$urlAlias['keyword'];
            } else {
                $url = $urlAliasCat['keyword'].'/'.$urlAlias['keyword'];
            }

            $productData[] = [
                'id'        => $item['product_id'],
                'name'      => $item['description']['name'],
                'image_url' => $item['image'],
                'url'       => $url,
                'price'     => $item['price'],
                'article'   => $item['sku'],

            ];
        }

        $p = [
            'products' => $productData,
            'pagination' => [
                        'total' => $product->total(),
                        //per_page' => $productCat->perPage(),
                        'current_page' => $product->currentPage(),
                        'last_page' => $product->lastPage(),
                        'from' => $product->firstItem(),
                        'to' => $product->lastItem(),
                    ],
                ];
        return $p;
    }


    /**
     * {@inheritDoc}
     */
    public function find(int $productId)
    {
        $product = $this->product->with(['categories:id,name', 'tags:id,name', 'attributes'])->findOrFail($productId);

        return $product;
    }

    public function optionsData()
    {
        $tag        = $this->tag->select('id', 'name')->get();
        $attribute  = $this->attribute->select('id', 'name')->get();
        $category   = $this->category->select('id', 'name as label', 'parent_id')->where('parent_id', NULL)->with('children')->where('status', 'active')->get();

        $data = [
            'tags'       => $tag,
            'attributes' => $attribute,
            'categories' => $category
        ];

        return $data;
    }

    public function type($request, $url)
    {
        $length   = 12;
        $priceMin = $request->input('price_min');
        $priceMax = $request->input('price_max');
        $country  = $request->input('country');
        //$priceMin = $request->input('price_min');
        //$priceMin = $request->input('price_min');

        $urlExplode = explode('/',$url);
        $c = count($urlExplode);
        $lastUrl = $urlExplode[$c-1];


        //$qu = 'category_id='.$item['category_id'];
        $urlAlias = $this->urlAlias->where('keyword', $lastUrl)->first();
        $expUrlAlias = explode('=', $urlAlias['query']);
        $itemType = $expUrlAlias[0];

        if($itemType == 'product_id') {
        //$product = $this->product->where('status', 'active')->orderBy('sort_order', 'asc')->get();
        $product = $this->product->with(['gallery', 'attributes', 'mainCategory'])->where('product_id', $expUrlAlias[1])->first();
        //dd($product);  

        if(isset($product->product_id)) {

            $qu = 'product_id='.$product['product_id'];
            $urlAlias = $this->urlAlias->where('query', $qu)->first();

        //foreach ($product as $item) {
            $categoryProd = $this->category->where('category_id', $product['mainCategory']['category_id'])->first();
            $quCat = 'category_id='.$categoryProd['category_id'];
            $urlAliasCat = $this->urlAlias->where('query', $quCat)->first();

            if($categoryProd['parent_id']) {
                $categoryChild = $this->category->where('category_id', $categoryProd['parent_id'])->first();
                $quCatChild = 'category_id='.$categoryChild['category_id'];
                $urlAliasCatChild = $this->urlAlias->where('query', $quCatChild)->first();

                if($categoryChild['parent_id']) {
                    $categoryChildS = $this->category->where('category_id', $categoryChild['parent_id'])->first();
                    $quCatChildS = 'category_id='.$categoryChildS['category_id'];
                    $urlAliasCatChildS = $this->urlAlias->where('query', $quCatChildS)->first();

                    $productUrl = $urlAliasCatChild['keyword'].'/'.$urlAliasCat['keyword'].'/'.$urlAlias['keyword'];

                 $breadcrumbs = [
                    ['name' => 'Главная', 'url' => '/'],
                    ['name' => $categoryChildS['description']['name'], 
                        'url' => '/'.$urlAliasCatChildS['keyword']],
                    ['name' => $categoryChild['description']['name'], 
                        'url' => '/'.$categoryChildS['keyword'].'/'.$urlAliasCatChildS['keyword']],
                    ['name' => $categoryProd['description']['name'], 
                        'url' => '/'.$urlAliasCatChild['keyword'].'/'.$urlAliasCat['keyword']],
                    ['name' => $product['description']['name'], 
                        'url' => '/'.$productUrl]
                ];
                } else {
                   $productUrl = $urlAliasCatChild['keyword'].'/'.$urlAliasCat['keyword'].'/'.$urlAlias['keyword'];

                 $breadcrumbs = [
                    ['name' => 'Главная', 'url' => '/'],
                    ['name' => $categoryChild['description']['name'], 'url' => '/'.$urlAliasCatChild['keyword']],
                    ['name' => $categoryProd['description']['name'], 'url' => '/'.$urlAliasCatChild['keyword'].'/'.$urlAliasCat['keyword']],
                    ['name' => $product['description']['name'], 'url' => '/'.$productUrl]
                ]; 
                }

                
            } else {
                $productUrl = $urlAliasCat['keyword'].'/'.$urlAlias['keyword'];

                 $breadcrumbs = [
                    ['name' => 'Главная', 'url' => '/'],
                    ['name' => $categoryProd['description']['name'], 'url' => '/'.$urlAliasCat['keyword']],
                    ['name' => 'Главная', 'url' => '/'],
                    ['name' => $product['description']['name'], 'url' => '/'.$productUrl]
                ];
            }

            $gallery = [];
            foreach ($product['gallery'] as $itemGallery) {
                $gallery[] = [
                    'name' => $itemGallery['name'],
                    'image_url' => '/'.$itemGallery['image']
                ];
            }

            $attribute = [];
            foreach ($product['attributes'] as $itemAttr) {
                $attribute[] = [
                    'name'      => $itemAttr['text'],
                    'description' => $itemAttr['description']['name']
                ];
            }

            //if($url === $productUrl) {
                $productData = [
                    'id'         => $product['product_id'],
                    'name'       => $product['description']['name'],
                    'image_url'  => $product['image'],
                    'url'        => '/'.$productUrl,
                    'price'      => $product['price'],
                    'article'    => $product['sku'],
                    'description' => htmlspecialchars_decode($product['description']['description']),
                    'breadcrumbs' => $breadcrumbs,
                    'gallery'    => $gallery,
                    'attributes' => $attribute
                ];

                //dd($productData);
                return [
                    'type' => 'product', 
                    'product' => $productData 
                ];
            //}
        //}
        }

        } // end itemType

        if($itemType == 'category_id') {
        //$category = $this->category->with('children')->where('parent_id', NULL)->where('status', 'active')->orderBy('sort_order', 'asc')->get();

        $category = $this->category->where('category_id', $expUrlAlias[1])->with('description')->first();
            $quCat = 'category_id='.$category['category_id'];
            $urlAliasCat = $this->urlAlias->where('query', $quCat)->first();

            if($category['parent_id'] > 0) {
                $categoryCatChild = $this->category->where('category_id', $category['parent_id'])->first();
                $quCatChild = 'category_id='.$categoryCatChild['category_id'];
                $urlAliasCatChild = $this->urlAlias->where('query', $quCatChild)->first();
            }

            if(isset($categoryCatChild->id)) {
                $categoryUrl = $urlAliasCatChild['keyword'].'/'.$urlAliasCat['keyword'];
            } else {
                $categoryUrl = $urlAliasCat['keyword'];
            }

            //if($url === $categoryUrl) {

               
                $pCat = \App\Models\Product\OcProductToCategory::where('category_id', $category->category_id)->get();
                //->where('main_category', 1)
                //if(isset($pCat[0])) {
                $ppp = [];
                $productCat = [];
                foreach ($pCat as $pItem) {
                    $ppp[] = $pItem['product_id'];
                    // $productQuery = $this->product->where('product_id', $pItem['product_id']);
                    // if($priceMin) {
                    //     $productQuery = $productQuery->where('price', '>=', $priceMin);
                    // }
                    // if($priceMax) {
                    //     $productQuery = $productQuery->where('price', '<=', $priceMax);
                    // }

                    // $productQuery = $productQuery->first();

                    // if(isset($productQuery->product_id)) {
                    //     $productCat[] = $productQuery;
                    // }
                    
                }

                 $productCat = $this->product->whereIn('product_id', $ppp);
                 if($priceMin) {
                    $productCat = $productCat->where('price', '>=', $priceMin);
                 }
                 if($priceMax) {
                    $productCat = $productCat->where('price', '<=', $priceMax);
                 }
                 $productCat = $productCat->paginate($length);

                $productCatData = [];
                foreach ($productCat as $productItemCat) {
                    $quCatProd = 'product_id='.$productItemCat['product_id'];
                    $urlAliasProd = $this->urlAlias->where('query', $quCatProd)->first();

                    $totalUrl = '/'.$categoryUrl.'/'.$urlAliasProd['keyword'];
                    if($category['parent_id'] > 0) {
                        $c2 = $this->category->where('category_id', $category['parent_id'])->first();
                        $qc2 = 'category_id='.$c2['category_id'];
                        $url2 = $this->urlAlias->where('query', $qc2)->first();
                        $totalUrl = '/'.$url2['keyword']. '/'.$categoryUrl.'/'.$urlAliasProd['keyword'];

                        if($c2['parent_id'] > 0) {
                            $c3 = $this->category->where('category_id', $c2['parent_id'])->first();
                            $qc3 = 'category_id='.$c3['category_id'];
                            $url3 = $this->urlAlias->where('query', $qc3)->first();
                            $totalUrl = '/'.$url3['keyword']. '/'.$url2['keyword']. '/'.$categoryUrl.'/'.$urlAliasProd['keyword'];
                         
                        }
                    }

                    $productCatData[] = [
                        'id'        => $productItemCat['product_id'],
                        'name'      => $productItemCat['description']['name'],
                        'image_url' => $productItemCat['image'],
                        'url'       => $totalUrl,
                        'price'     => $productItemCat['price'],
                        'article'   => $productItemCat['sku'],
                    ];
                }

                $subCategoryData = [];
                $subCategory = $this->category->where('parent_id', $category['category_id'])->where('status', 1)->orderBy('sort_order', 'asc')->get();
                
                foreach ($subCategory as $subItem) {
                 
                    $quCatSubCat = 'category_id='.$subItem['category_id'];
                    $urlAliasSubCat = $this->urlAlias->where('query', $quCatSubCat)->first();
       
                    $totalUrl = '/'.$urlAliasCat['keyword'].'/'.$urlAliasSubCat['keyword'];
                    if($category['parent_id'] > 0) {
                        $c2 = $this->category->where('category_id', $category['parent_id'])->first();
                        $qc2 = 'category_id='.$c2['category_id'];
                        $url2 = $this->urlAlias->where('query', $qc2)->first();
                        $totalUrl = '/'.$url2['keyword']. '/'.$urlAliasCat['keyword'].'/'.$urlAliasSubCat['keyword'];

                        if($c2['parent_id'] > 0) {
                            $c3 = $this->category->where('category_id', $c2['parent_id'])->first();
                            $qc3 = 'category_id='.$c3['category_id'];
                            $url3 = $this->urlAlias->where('query', $qc3)->first();
                            $totalUrl = '/'.$url3['keyword']. '/'.$url2['keyword']. '/'.$urlAliasCat['keyword'].'/'.$urlAliasSubCat['keyword'];
                         
                        }
                    }
                        $subCategoryData[] = [
                        'id'        => $subItem['category_id'],
                        'name'      => $subItem['description']['name'],
                        'image_url' => $subItem['image'],
                        'url'       => $totalUrl
                        ];
                    
                    
                }

                $breadcrumbs = [];
                
                if($category['parent_id'] > 0) {
                    $categoryCatChild = $this->category->where('category_id', $category['parent_id'])->first();
                    $quCatChild = 'category_id='.$categoryCatChild['category_id'];
                    $urlAliasCatChild = $this->urlAlias->where('query', $quCatChild)->first();
                     
                    if($categoryCatChild['parent_id'] > 0) {
                        $categoryCatChildS = $this->category->where('category_id', $categoryCatChild['parent_id'])->with('description')->first();
                        $quCatChildS = 'category_id='.$categoryCatChildS['category_id'];
                        $urlAliasCatChildS = $this->urlAlias->where('query', $quCatChildS)->first();

                        if($categoryCatChildS['parent_id'] > 0) {
                            $breadcrumbs = [
                                ['name' => 'Главная', 'url' => '/'],
                                ['name' => $category['description']['name'], 
                                    'url' => '/'.$urlAliasCatChildS['keyword'].'/'.$urlAliasCatChild['keyword'].'/'.$urlAliasCat['keyword']],
                                ['name' => $categoryCatChild['description']['name'], 
                                    'url' => '/'.$urlAliasCatChild['keyword']],
                                ['name' => $category['description']['name'], 
                                    'url' => '/'.$urlAliasCatChild['keyword'].'/'.$urlAliasCat['keyword']]
                            ];

                        } else {
                        $breadcrumbs = [
                            ['name' => 'Главная', 'url' => '/'],
                             ['name' => $categoryCatChildS['description']['name'], 
                                'url' => '/'.$urlAliasCatChildS['keyword']],
                            ['name' => $categoryCatChild['description']['name'], 
                                'url' => $urlAliasCatChildS['keyword']. '/'.$urlAliasCatChild['keyword']],
                            ['name' => $category['description']['name'], 
                                'url' => $urlAliasCatChildS['keyword']. '/'.$urlAliasCatChild['keyword'].'/'.$urlAliasCat['keyword']]
                        ];
                         
                        // $breadcrumbs = [
                        //     ['name' => 'Главная', 'url' => '/'],
                        //     ['name' => $category['description']['name'], 
                        //         'url' => '/'.$urlAliasCat['keyword']],
                        //     ['name' => $categoryCatChild['description']['name'], 
                        //         'url' => '/'.$urlAliasCat['keyword'].'/'.$urlAliasCatChild['keyword']],
                        //     ['name' => $categoryCatChildS['description']['name'], 
                        //         'url' => '/'.$urlAliasCat['keyword'].'/'.$urlAliasCatChild['keyword']].'/'.$urlAliasCatChildS['keyword']]
                        // ];
                        }
                    } else {
                        $breadcrumbs = [
                            ['name' => 'Главная', 'url' => '/'],
                            ['name' => $categoryCatChild['description']['name'], 
                                'url' => '/'.$urlAliasCatChild['keyword']],
                            ['name' => $category['description']['name'], 
                                'url' => '/'.$urlAliasCatChild['keyword'].'/'.$urlAliasCat['keyword']]
                        ];
                        // $breadcrumbs = [
                        //     ['name' => 'Главная', 'url' => '/'],
                        //     ['name' => $category['description']['name'], 
                        //         'url' => '/'.$urlAliasCat['keyword']],
                        //     ['name' => $categoryCatChild['description']['name'], 
                        //         'url' => '/'.$urlAliasCat['keyword'].'/'.$urlAliasCatChild['keyword']],
                        //     ['name' => $categoryCatChildS['description']['name'], 
                        //         'url' => '/'.$urlAliasCat['keyword'].'/'.$urlAliasCatChild['keyword']].'/'.$urlAliasCatChildS['keyword']]
                        // ];
                    }
                } else {
                    $breadcrumbs = [
                        ['name' => 'Главная', 'url' => '/'],
                        ['name' => $category['description']['name'], 
                            'url' => '/'.$urlAliasCat['keyword']],
                    ];
                }


                $categoryData = [
                    'id'        => $category['category_id'],
                    'name'      => $category['description']['name'],
                    'image_url' => $category['image'],
                    'url'       => $urlAliasCat['keyword']
                ];

                return [
                    'type' => 'category', 
                    'sub_categories' => $subCategoryData,
                    'products' => $productCatData,
                    'category' => $categoryData,
                    'breadcrumbs' => $breadcrumbs,
                    'pagination' => [
                        'total' => $productCat->total(),
                        //per_page' => $productCat->perPage(),
                        'current_page' => $productCat->currentPage(),
                        'last_page' => $productCat->lastPage(),
                        'from' => $productCat->firstItem(),
                        'to' => $productCat->lastItem(),
                    ],
                ];
            //}
        } //end itemType

    }

     public function getProduct($request)
    {
        $length   = 12;
        $type     = $request->input('type');
        $priceMin = $request->input('price_min');
        $priceMax = $request->input('price_max');
        $country  = $request->input('country');

        $product = $this->product;
        if($priceMin) {
        $product = $product->where('price', '>=', $priceMin);
        }
        if($priceMax) {
        $product = $product->where('price', '<=', $priceMax);
        }
        
        $product = $product->paginate($length);

        $productData = [];
        foreach ($product as $item) {
            $qu = 'product_id='.$item['product_id'];
            $urlAlias = $this->urlAlias->where('query', $qu)->first();
            $productData[] = [
                'id'        => $item['product_id'],
                'name'      => $item['description']['name'],
                'image_url' => $item['image'],
                'url'       => $urlAlias['keyword'],
                'price'     => $item['price'],
                'article'   => $item['sku'],
            ];
        }

        return $productData;
        
    }

    public function search($request)
    {
       $search = $request->input('search');

       $productQuery = $this->product->with('description')
                       ->where('product_id', $search)
                       ->orWhere('sku', $search)
                       ->get();

       $productData = [];
       foreach ($productQuery as $item) {
           $productData[] = [
                'id' => $item['product_id'],
                'name' => $item['description']['name'],
                'image' => $item['image'],
                'price' => $item['price'],
           ];
       }

        return $productData;
    }

}
